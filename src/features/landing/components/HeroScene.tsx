import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================================
// AERIS ADVANCED INTERACTIVE 3D MOTION & DIGITAL TWIN HERO SCENE
// Direct port of Stitch code.html specification enhanced with:
// - Physical 3D terrain micro-interaction & trailing pointer wake
// - Dynamic radial surface ripples on pointer velocity
// - UAV proximity banking & flight path / pose marker highlight
// - Ambient terrain breathing & periodic scan pulse
// - Smooth scroll-driven 3D camera elevation evolution
// ============================================================

// Global pointer state ref for cross-component 3D reactivity
const sharedPointerState = {
  worldX: 0,
  worldZ: 0,
  rawX: 0,
  rawY: 0,
  isActive: false,
  velocity: 0,
  lastX: 0,
  lastZ: 0,
  rippleTime: -100,
  rippleX: 0,
  rippleZ: 0,
};

// ------------------------------------------------------------
// 1. Mouse-Reactive Dense Point Cloud Terrain (18,000 Points)
// ------------------------------------------------------------
function ReconstructionPointCloud() {
  const pointsRef = useRef<THREE.Points>(null!);
  const posAttrRef = useRef<THREE.BufferAttribute>(null!);
  const currentInfluenceRef = useRef(0);
  const smoothedPointer = useRef({ x: 0, z: 0 });
  const wakePointer = useRef({ x: 0, z: 0, intensity: 0 });

  // Generate static original positions, working array, and height colors
  const { originalPositions, workingPositions, colors } = useMemo(() => {
    const pointCount = 18000;
    const origPos = new Float32Array(pointCount * 3);
    const workPos = new Float32Array(pointCount * 3);
    const cols = new Float32Array(pointCount * 3);

    const colorPalette = [
      new THREE.Color(0x00f0ff), // Cyan
      new THREE.Color(0x38bdf8), // Sky blue
      new THREE.Color(0x2dd4bf), // Teal
      new THREE.Color(0x10b981), // Emerald telemetry
      new THREE.Color(0x64748b)  // Base rock/structure
    ];

    for (let i = 0; i < pointCount; i++) {
      const x = (Math.random() - 0.5) * 320;
      const z = (Math.random() - 0.5) * 320;

      // Terrain topography height map procedural equation
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.035) * Math.cos(z * 0.035) * 22 + Math.sin(dist * 0.05) * 14;

      // Central architectural / terrain structure cluster
      if (Math.abs(x) < 55 && Math.abs(z) < 55) {
        y += (1.0 - Math.max(Math.abs(x), Math.abs(z)) / 55) * 45;
      }

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      workPos[i * 3] = x;
      workPos[i * 3 + 1] = y;
      workPos[i * 3 + 2] = z;

      const colIdx = Math.floor(Math.random() * colorPalette.length);
      const c = colorPalette[colIdx].clone();
      if (y > 30) c.lerp(new THREE.Color(0x00f0ff), 0.7);

      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return { originalPositions: origPos, workingPositions: workPos, colors: cols };
  }, []);

  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Respect OS prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targetInf = sharedPointerState.isActive && !prefersReducedMotion ? 1.0 : 0.0;

    // Smoothly lerp influence factor
    currentInfluenceRef.current += (targetInf - currentInfluenceRef.current) * 0.18;
    const influence = currentInfluenceRef.current;

    // Project normalized pointer coordinates into 3D world terrain space
    const targetX = pointer.x * 160;
    const targetZ = -pointer.y * 120;

    // Update shared pointer state for cross-component reactivity
    const dxP = targetX - sharedPointerState.lastX;
    const dzP = targetZ - sharedPointerState.lastZ;
    const vel = Math.sqrt(dxP * dxP + dzP * dzP);
    sharedPointerState.velocity = vel;
    sharedPointerState.worldX = targetX;
    sharedPointerState.worldZ = targetZ;
    sharedPointerState.rawX = pointer.x;
    sharedPointerState.rawY = pointer.y;

    // Trigger radial surface ripple on fast pointer movement
    if (vel > 18.0 && time - sharedPointerState.rippleTime > 0.6) {
      sharedPointerState.rippleTime = time;
      sharedPointerState.rippleX = targetX;
      sharedPointerState.rippleZ = targetZ;
    }
    sharedPointerState.lastX = targetX;
    sharedPointerState.lastZ = targetZ;

    // Smooth pointer & trailing wake tracking
    smoothedPointer.current.x += (targetX - smoothedPointer.current.x) * 0.22;
    smoothedPointer.current.z += (targetZ - smoothedPointer.current.z) * 0.22;

    wakePointer.current.x += (smoothedPointer.current.x - wakePointer.current.x) * 0.08;
    wakePointer.current.z += (smoothedPointer.current.z - wakePointer.current.z) * 0.08;
    wakePointer.current.intensity = Math.min(1.0, vel * 0.08) * influence;

    const px = smoothedPointer.current.x;
    const pz = smoothedPointer.current.z;
    const wx = wakePointer.current.x;
    const wz = wakePointer.current.z;
    const wInt = wakePointer.current.intensity;

    // Radial ripple state
    const rippleAge = time - sharedPointerState.rippleTime;
    const isRippleActive = rippleAge >= 0 && rippleAge < 0.7 && !prefersReducedMotion;
    const rippleRadius = rippleAge * 160;
    const rippleDecay = Math.max(0, 1 - rippleAge / 0.7);

    const radiusSq = 85 * 85; // 7225 radius of primary interaction
    const invRadius = 1 / 85;

    // Continuous ambient breathing wave
    const breathPhase = time * 0.9;
    const scanPulsePhase = time * 1.5;

    for (let i = 0; i < 18000; i++) {
      const idx3 = i * 3;
      const ox = originalPositions[idx3];
      const oy = originalPositions[idx3 + 1];
      const oz = originalPositions[idx3 + 2];

      // A. Ambient terrain breathing wave
      let finalY = oy + Math.sin(breathPhase + ox * 0.035 + oz * 0.035) * 1.2;

      // B. Ambient periodic reconstruction scan pulse
      const distFromCenter = Math.sqrt(ox * ox + oz * oz);
      const scanWave = Math.sin(scanPulsePhase - distFromCenter * 0.04);
      if (scanWave > 0.8) {
        finalY += (scanWave - 0.8) * 4.5;
      }

      let finalX = ox;
      let finalZ = oz;

      // C. Pointer Interaction & Wake Repulsion
      if (influence > 0.001) {
        const dx = ox - px;
        const dz = oz - pz;
        const dSq = dx * dx + dz * dz;

        if (dSq < radiusSq) {
          const d = Math.sqrt(dSq);
          const normDist = d * invRadius;
          const factor = (1 - normDist) * (1 - normDist) * influence;

          // Strong physical terrain depression & point repulsion
          finalY -= factor * 16.5;
          const normFactor = d > 0.001 ? (factor * 9.0) / d : 0;
          finalX += dx * normFactor;
          finalZ += dz * normFactor;
        }

        // Pointer Wake / Trail effect
        if (wInt > 0.05) {
          const wdx = ox - wx;
          const wdz = oz - wz;
          const wdSq = wdx * wdx + wdz * wdz;
          if (wdSq < 3600) {
            const wd = Math.sqrt(wdSq);
            const wFactor = (1 - wd / 60) * wInt;
            finalY -= wFactor * 5.5;
          }
        }
      }

      // D. Radial Surface Ripple
      if (isRippleActive) {
        const rdx = ox - sharedPointerState.rippleX;
        const rdz = oz - sharedPointerState.rippleZ;
        const rDist = Math.sqrt(rdx * rdx + rdz * rdz);
        const rDiff = Math.abs(rDist - rippleRadius);

        if (rDiff < 22) {
          const rFactor = (1 - rDiff / 22) * rippleDecay;
          finalY += Math.sin((rDist - rippleRadius) * 0.25) * rFactor * 4.5;
        }
      }

      workingPositions[idx3] = finalX;
      workingPositions[idx3 + 1] = finalY;
      workingPositions[idx3 + 2] = finalZ;
    }

    if (posAttrRef.current) {
      posAttrRef.current.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={posAttrRef}
          attach="attributes-position"
          args={[workingPositions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={2.2}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ------------------------------------------------------------
// 2. Procedural Wireframe / Mesh Complex (Surface Mesh Stage)
// ------------------------------------------------------------
function WireframeMeshComplex() {
  return (
    <mesh position={[0, 16, 0]}>
      <boxGeometry args={[70, 48, 60, 8, 6, 8]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

// ------------------------------------------------------------
// 3. Flight Path Ribbon & Proximity-Reactive Camera Pose Cones
// ------------------------------------------------------------
function FlightTrajectoryAndPoses({
  flightCurve
}: {
  flightCurve: THREE.CatmullRomCurve3;
}) {
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null!);
  const poseGroupRef = useRef<THREE.Group>(null!);

  const lineObject = useMemo(() => {
    const points = flightCurve.getPoints(240);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      linewidth: 2
    });
    lineMatRef.current = lineMaterial;
    return new THREE.Line(lineGeometry, lineMaterial);
  }, [flightCurve]);

  const cameraPoses = useMemo(() => {
    const numPoints = 120;
    const items: { id: number; pos: THREE.Vector3 }[] = [];
    for (let i = 5; i < numPoints; i += 8) {
      const t = i / numPoints;
      const pt = flightCurve.getPointAt(t);
      items.push({ id: i, pos: pt });
    }
    return items;
  }, [flightCurve]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Flight path proximity highlight
    if (lineMatRef.current) {
      const px = sharedPointerState.worldX;
      const pz = sharedPointerState.worldZ;
      const distToCenter = Math.sqrt(px * px + pz * pz);
      const isNearPath = Math.abs(distToCenter - 80) < 30 && sharedPointerState.isActive;
      const targetOpacity = isNearPath ? 0.95 : 0.75;
      lineMatRef.current.opacity += (targetOpacity - lineMatRef.current.opacity) * 0.08;
    }

    // Camera pose marker pulsing & pointer proximity scaling
    if (poseGroupRef.current) {
      const pulseScale = 1.0 + Math.sin(time * 2.5) * 0.08;
      poseGroupRef.current.children.forEach((child, idx) => {
        const itemPos = cameraPoses[idx]?.pos;
        if (itemPos) {
          const dx = itemPos.x - sharedPointerState.worldX;
          const dz = itemPos.z - sharedPointerState.worldZ;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const isNear = dist < 45 && sharedPointerState.isActive;
          const targetS = isNear ? 1.35 * pulseScale : 1.0 * pulseScale;

          child.scale.x += (targetS - child.scale.x) * 0.1;
          child.scale.y += (targetS - child.scale.y) * 0.1;
          child.scale.z += (targetS - child.scale.z) * 0.1;
        }
      });
    }
  });

  return (
    <>
      {/* Dynamic Spline Flight Path Ribbon */}
      <primitive object={lineObject} />

      {/* Camera Pose Cones / Frustums */}
      <group ref={poseGroupRef}>
        {cameraPoses.map((item) => {
          const target = new THREE.Vector3(0, 15, 0);
          const matrix = new THREE.Matrix4();
          matrix.lookAt(item.pos, target, new THREE.Vector3(0, 1, 0));
          const rotation = new THREE.Euler().setFromRotationMatrix(matrix);

          return (
            <mesh
              key={item.id}
              position={item.pos}
              rotation={rotation}
            >
              <coneGeometry args={[2.8, 5.5, 4]} />
              <meshBasicMaterial
                color="#00f0ff"
                wireframe
                transparent
                opacity={0.6}
              />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

// ------------------------------------------------------------
// 4. High-Tech UAV Drone Model with Proximity Banking & Scan Beam
// ------------------------------------------------------------
function UAVDrone({
  flightCurve,
  cyanPointRef
}: {
  flightCurve: THREE.CatmullRomCurve3;
  cyanPointRef: React.RefObject<THREE.PointLight>;
}) {
  const droneGroupRef = useRef<THREE.Group>(null!);
  const rotorRefs = useRef<THREE.Mesh[]>([]);
  const scanBeamRef = useRef<THREE.Mesh>(null!);
  const flightProgress = useRef(0);

  const armPositions = [
    { x: 5.5, z: 5.5 },
    { x: -5.5, z: 5.5 },
    { x: 5.5, z: -5.5 },
    { x: -5.5, z: -5.5 }
  ];

  useFrame(({ clock }, delta) => {
    const time = clock.getElapsedTime();

    // Spin propellers
    rotorRefs.current.forEach((r) => {
      if (r) r.rotation.y += 0.65;
    });

    // Move UAV along flight path trajectory
    flightProgress.current = (flightProgress.current + delta * 0.065) % 1.0;
    const currentPos = flightCurve.getPointAt(flightProgress.current);
    const nextPos = flightCurve.getPointAt((flightProgress.current + 0.01) % 1.0);

    if (droneGroupRef.current) {
      droneGroupRef.current.position.copy(currentPos);
      droneGroupRef.current.lookAt(nextPos);

      // UAV Proximity Banking response when pointer is near
      if (sharedPointerState.isActive) {
        const dx = sharedPointerState.worldX - currentPos.x;
        const dz = sharedPointerState.worldZ - currentPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 90) {
          const bankAmount = (1 - dist / 90) * 0.15;
          droneGroupRef.current.rotation.z += Math.sin(time * 3) * 0.04 + bankAmount * Math.sign(dx);
        }
      }
    }

    // Scanning Beam Slow Sweep
    if (scanBeamRef.current) {
      scanBeamRef.current.rotation.z = Math.sin(time * 1.5) * 0.12;
    }

    // Pulse cyan point light at UAV position
    if (cyanPointRef.current) {
      cyanPointRef.current.position.copy(currentPos);
      cyanPointRef.current.intensity = 2.0 + Math.sin(time * 3.5) * 0.8;
    }
  });

  return (
    <group ref={droneGroupRef}>
      {/* Central Fuselage */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 2.4, 12]} />
        <meshLambertMaterial color="#0f172a" />
      </mesh>

      {/* Sensor Gimbal */}
      <mesh position={[0, -1.8, 3.5]}>
        <sphereGeometry args={[1.8, 12, 12]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* 4 Arms & Spinning Rotors */}
      {armPositions.map((pos, idx) => {
        const angle = Math.atan2(pos.z, pos.x);
        return (
          <group key={idx}>
            <mesh
              position={[pos.x * 0.5, 0, pos.z * 0.5]}
              rotation={[0, angle, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.4, 0.4, 7]} />
              <meshLambertMaterial color="#334155" />
            </mesh>

            <mesh
              ref={(el) => {
                if (el) rotorRefs.current[idx] = el;
              }}
              position={[pos.x, 0.8, pos.z]}
            >
              <cylinderGeometry args={[3.5, 3.5, 0.2, 8]} />
              <meshBasicMaterial color="#38bdf8" transparent opacity={0.55} />
            </mesh>
          </group>
        );
      })}

      {/* Drone Scanning Frustum Light Beam with Slow Sweep */}
      <mesh ref={scanBeamRef} position={[0, -32, 0]}>
        <coneGeometry args={[24, 65, 4, 1, true]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ------------------------------------------------------------
// 5. World Group & Interactive Camera Parallax + Scroll Evolution
// ------------------------------------------------------------
function WorldGroupContainer() {
  const worldGroupRef = useRef<THREE.Group>(null!);
  const cyanPointRef = useRef<THREE.PointLight>(null!);
  const scrollYRef = useRef(0);

  // Scroll listener for subtle hero 3D evolution
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate Stitch Flight Trajectory Curve (120 points spiral & wave)
  const flightCurve = useMemo(() => {
    const curvePoints: THREE.Vector3[] = [];
    const numPoints = 120;
    for (let i = 0; i < numPoints; i++) {
      const theta = (i / numPoints) * Math.PI * 4;
      const rad = 95 - i * 0.25;
      const tx = Math.cos(theta) * rad;
      const tz = Math.sin(theta) * rad;
      const ty = 50 + Math.sin(i * 0.15) * 18 + i * 0.12;
      curvePoints.push(new THREE.Vector3(tx, ty, tz));
    }
    return new THREE.CatmullRomCurve3(curvePoints);
  }, []);

  const { camera, pointer } = useThree();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const scrollY = scrollYRef.current;

    // Slow world rotation + subtle scroll evolution
    if (worldGroupRef.current) {
      worldGroupRef.current.rotation.y = time * 0.035 + scrollY * 0.0012;
    }

    // Smooth camera tracking with inertia damping & depth response
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isActive = sharedPointerState.isActive && !prefersReducedMotion;
    const targetCameraX = isActive ? pointer.x * 75 : 0;
    const targetCameraY = (isActive ? 140 - pointer.y * 40 : 140) + scrollY * 0.1;
    const targetCameraZ = 260 + (isActive ? Math.abs(pointer.x) * 16 : 0);

    camera.position.x += (targetCameraX - camera.position.x) * 0.06;
    camera.position.y += (targetCameraY - camera.position.y) * 0.06;
    camera.position.z += (targetCameraZ - camera.position.z) * 0.06;
    camera.lookAt(0, 15, 0);
  });

  return (
    <>
      {/* Pulsing Cyan Point Light following UAV */}
      <pointLight ref={cyanPointRef} color="#00f0ff" intensity={2.5} distance={400} />

      {/* Rotating World Root Group */}
      <group ref={worldGroupRef}>
        {/* 1. 360 Grid Helper Base */}
        <gridHelper args={[360, 45, '#00f0ff', '#1e293b']} position={[0, -10, 0]} />

        {/* 2. Advanced Mouse-Reactive Reconstruction Dense Point Cloud */}
        <ReconstructionPointCloud />

        {/* 3. Surface Wireframe Mesh Complex */}
        <WireframeMeshComplex />

        {/* 4. Flight Path Ribbon & Camera Poses */}
        <FlightTrajectoryAndPoses flightCurve={flightCurve} />

        {/* 5. UAV Drone Model & Scanning Beam */}
        <UAVDrone flightCurve={flightCurve} cyanPointRef={cyanPointRef} />
      </group>
    </>
  );
}

// ============================================================
// Main Hero Scene Component (Full-Screen R3F Canvas)
// ============================================================
export const HeroScene: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      onPointerEnter={() => {
        sharedPointerState.isActive = true;
      }}
      onPointerLeave={() => {
        sharedPointerState.isActive = false;
      }}
      onPointerMove={() => {
        sharedPointerState.isActive = true;
      }}
    >
      <Canvas
        camera={{ position: [0, 140, 260], fov: 45, near: 0.1, far: 2000 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fogExp2 attach="fog" args={['#0a0e17', 0.0035]} />

        <ambientLight color="#0f172a" intensity={1.2} />
        <directionalLight color="#38bdf8" intensity={1.8} position={[80, 150, 60]} />

        <WorldGroupContainer />
      </Canvas>
    </div>
  );
};
