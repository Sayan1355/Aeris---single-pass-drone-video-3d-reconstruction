// ============================================================
// AERIS — Advanced 3D Reconstruction Viewport (Phase 3 Final - Motion Pass)
// Smooth R3F animation loops, UAV trajectory flight, 3DGS particle convergence,
// progressive reconstruction formation, and responsive stage transitions.
// ============================================================

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Grid,
  Text,
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei';
import * as THREE from 'three';
import type { VisualizationMode } from '../types';
import { useReconStore } from '../hooks/useReconStore';

// ---------- Math Utilities ------------------------------------

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Procedural heightmap function combining multiple noise octaves */
function getTerrainElevation(x: number, z: number): number {
  const hill1 = Math.sin(x * 0.08) * Math.cos(z * 0.07) * 3.5;
  const hill2 = Math.sin(x * 0.18 + 1.2) * Math.cos(z * 0.15 - 0.5) * 1.5;
  const ridge = Math.abs(Math.sin((x + z) * 0.05)) * 2.0;
  const valley = -Math.exp(-Math.pow((x * 0.06 - z * 0.04), 2)) * 3.0;
  const detail = Math.sin(x * 0.4 + z * 0.3) * 0.4;
  return hill1 + hill2 + ridge + valley + detail;
}

// ---------- Trajectory Flight Curve Definition -----------------

function getFlightCurve(): THREE.CatmullRomCurve3 {
  const waypoints: THREE.Vector3[] = [];
  for (let pass = 0; pass < 5; pass++) {
    const z = -22 + pass * 9;
    const dir = pass % 2 === 0 ? 1 : -1;
    waypoints.push(new THREE.Vector3(dir * -28, 18, z));
    waypoints.push(new THREE.Vector3(dir * 28, 18, z));
  }
  return new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.5);
}

// ---------- 1. Realistic Procedural Terrain -------------------

function Terrain({ vizMode, activeStageId }: { vizMode: VisualizationMode; activeStageId: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 96, 96);
    const pos = geo.attributes.position;
    const count = pos.count;
    const colorArr = new Float32Array(count * 3);

    const cLow = new THREE.Color('#2C3823');   // Valley grass
    const cMid = new THREE.Color('#4A5636');   // Midland vegetation
    const cHigh = new THREE.Color('#6E6B52');  // Ridge dirt/rock
    const cPeak = new THREE.Color('#888470');  // High exposed rock

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const elev = getTerrainElevation(x, z);
      pos.setY(i, elev);

      let col = cLow.clone();
      if (elev > 2.5) {
        col.lerp(cPeak, Math.min(1, (elev - 2.5) / 3.0));
      } else if (elev > 0.5) {
        col.lerp(cHigh, (elev - 0.5) / 2.0);
      } else if (elev > -1.0) {
        col.lerp(cMid, (elev + 1.0) / 1.5);
      }

      colorArr[i * 3]     = col.r;
      colorArr[i * 3 + 1] = col.g;
      colorArr[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    return geo;
  }, []);

  const isDepthStage = activeStageId === 'metric-depth';

  const material = useMemo(() => {
    switch (vizMode) {
      case 'wireframe':
        return new THREE.MeshBasicMaterial({ color: '#0EA5E9', wireframe: true });
      case 'pointcloud':
        return new THREE.PointsMaterial({ color: '#0EA5E9', size: 0.12, transparent: true, opacity: 0.65 });
      case 'depth':
        return new THREE.MeshDepthMaterial();
      case 'classified':
        return new THREE.MeshStandardMaterial({ color: '#3A5230', roughness: 0.9, metalness: 0.0 });
      default:
        return new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 0.88,
          metalness: 0.04,
          flatShading: false,
        });
    }
  }, [vizMode]);

  // Smooth material response in useFrame
  useFrame((state) => {
    if (materialRef.current && vizMode === 'realistic') {
      const t = state.clock.getElapsedTime();
      if (isDepthStage) {
        materialRef.current.roughness = 0.5 + Math.sin(t * 2) * 0.1;
      } else {
        materialRef.current.roughness = 0.88;
      }
    }
  });

  if (vizMode === 'pointcloud') {
    return <points geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />;
  }

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    />
  );
}

// ---------- 2. Complex Procedural Structures (Progressive Formation) ---

interface StructureDef {
  id: string;
  x: number;
  z: number;
  type: 'tower' | 'office' | 'warehouse' | 'infrastructure' | 'outbuilding' | 'solar';
  color: string;
}

const STRUCTURES: StructureDef[] = [
  { id: 't1', x:  14, z:  -4, type: 'tower',          color: '#4B6275' },
  { id: 'o1', x:  -8, z:  -8, type: 'office',         color: '#556B7D' },
  { id: 'w1', x: -16, z:   6, type: 'warehouse',      color: '#50665A' },
  { id: 'i1', x:   8, z: -16, type: 'infrastructure', color: '#6A7888' },
  { id: 's1', x:  -4, z:  14, type: 'solar',          color: '#1E3A5F' },
  { id: 'b1', x:  -2, z: -18, type: 'outbuilding',    color: '#5C6B5E' },
  { id: 'b2', x:  18, z:   8, type: 'outbuilding',    color: '#657262' },
  { id: 'b3', x: -18, z: -12, type: 'outbuilding',    color: '#586670' },
];

function OfficeComplex({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#3A6A8A' : vizMode === 'depth' ? '#FFFFFF' : '#4E6375';
  const wire = vizMode === 'wireframe';
  const opacity = vizMode === 'depth' ? 0.6 : 1.0;

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 6, 5]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.6} metalness={0.2} transparent opacity={opacity} />
      </mesh>
      <mesh position={[2.5, 2.5, 4]} castShadow receiveShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.6} metalness={0.2} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-2, 6.4, 0]} castShadow>
        <boxGeometry args={[1.5, 0.8, 1.5]} />
        <meshStandardMaterial color="#334155" wireframe={wire} />
      </mesh>
      <mesh position={[1, 6.3, -1]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.6, 12]} />
        <meshStandardMaterial color="#475569" wireframe={wire} />
      </mesh>
      <mesh position={[0, 0.8, 2.8]} castShadow>
        <boxGeometry args={[3, 0.2, 1.2]} />
        <meshStandardMaterial color="#0EA5E9" wireframe={wire} />
      </mesh>
    </group>
  );
}

function HighRiseTower({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#3A6A8A' : vizMode === 'depth' ? '#FFFFFF' : '#42586B';
  const wire = vizMode === 'wireframe';

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[7, 4, 7]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.5} metalness={0.25} />
      </mesh>
      <mesh position={[0, 7.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 7, 5]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 12.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 3, 3.5]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 14.2, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 16]} />
        <meshStandardMaterial color="#D97706" wireframe={wire} />
      </mesh>
      <mesh position={[0, 15.5, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 2.2, 8]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
    </group>
  );
}

function IndustrialWarehouse({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#4A7A5A' : vizMode === 'depth' ? '#FFFFFF' : '#4F6154';
  const wire = vizMode === 'wireframe';

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 4, 8]} />
        <meshStandardMaterial color={color} wireframe={wire} roughness={0.7} />
      </mesh>
      <mesh position={[0, 4.8, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[6, 6, 7.8]} />
        <meshStandardMaterial color="#36453B" wireframe={wire} roughness={0.8} />
      </mesh>
      {[-3, 0, 3].map((offX, i) => (
        <mesh key={i} position={[offX, 1.2, 4.1]}>
          <boxGeometry args={[1.8, 2.2, 0.2]} />
          <meshStandardMaterial color="#1E293B" wireframe={wire} />
        </mesh>
      ))}
    </group>
  );
}

function InfrastructureSite({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#C2410C' : vizMode === 'depth' ? '#FFFFFF' : '#64748B';
  const wire = vizMode === 'wireframe';

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      <mesh position={[-3, 4, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 8, 8]} />
        <meshStandardMaterial color="#475569" wireframe={wire} />
      </mesh>
      <mesh position={[-3, 8.5, 0]} castShadow>
        <cylinderGeometry args={[2, 1.8, 2.5, 16]} />
        <meshStandardMaterial color={color} wireframe={wire} metalness={0.4} />
      </mesh>
      <mesh position={[2, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color={color} wireframe={wire} />
      </mesh>
      <mesh position={[2, 5, -2]}>
        <cylinderGeometry args={[0.1, 0.15, 7, 8]} />
        <meshStandardMaterial color="#0EA5E9" />
      </mesh>
    </group>
  );
}

function SolarArray({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#0284C7' : vizMode === 'depth' ? '#FFFFFF' : '#1E293B';
  const panelColor = vizMode === 'classified' ? '#0284C7' : vizMode === 'depth' ? '#FFFFFF' : '#0EA5E9';
  const wire = vizMode === 'wireframe';

  const rows = [-2, 0, 2];
  const cols = [-3, -1, 1, 3];

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      {rows.map((rX, rI) =>
        cols.map((cZ, cI) => (
          <group key={`${rI}-${cI}`} position={[rX, 0.6, cZ]} rotation={[0.35, 0, 0]}>
            <mesh castShadow>
              <boxGeometry args={[1.6, 0.1, 1.2]} />
              <meshStandardMaterial color={panelColor} wireframe={wire} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 6]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
          </group>
        ))
      )}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Outbuilding({ x, z, scale, vizMode }: { x: number; z: number; scale: number; vizMode: VisualizationMode }) {
  const elev = getTerrainElevation(x, z);
  const color = vizMode === 'classified' ? '#3A6A8A' : vizMode === 'depth' ? '#FFFFFF' : '#526356';
  const wire = vizMode === 'wireframe';

  return (
    <group position={[x, elev, z]} scale={[scale, scale, scale]}>
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.4, 2.5]} />
        <meshStandardMaterial color={color} wireframe={wire} />
      </mesh>
    </group>
  );
}

function Structures({ vizMode, activeStageId }: { vizMode: VisualizationMode; activeStageId: string | null }) {
  const [formationProgress, setFormationProgress] = useState(0);

  // Progressive materialization on mount / stage update
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const animate = () => {
      const t = Math.min((performance.now() - start) / 1800, 1);
      setFormationProgress(t);
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [activeStageId]);

  const effectiveVizMode = (activeStageId === 'surface-meshing' && formationProgress < 0.6)
    ? 'wireframe'
    : vizMode;

  if (effectiveVizMode === 'pointcloud') return null;

  return (
    <>
      {STRUCTURES.map((s) => {
        const p = Math.min(1, formationProgress * 1.2);
        if (p < 0.05) return null;

        switch (s.type) {
          case 'tower':
            return <HighRiseTower key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
          case 'office':
            return <OfficeComplex key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
          case 'warehouse':
            return <IndustrialWarehouse key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
          case 'infrastructure':
            return <InfrastructureSite key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
          case 'solar':
            return <SolarArray key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
          case 'outbuilding':
          default:
            return <Outbuilding key={s.id} x={s.x} z={s.z} scale={p} vizMode={effectiveVizMode} />;
        }
      })}
    </>
  );
}

// ---------- 3. Dense Surface-Aligned Point Cloud --------------

function DensePointCloud({ visible, vizMode }: { visible: boolean; vizMode: VisualizationMode }) {
  const geometry = useMemo(() => {
    const pointCount = 16000;
    const pos = new Float32Array(pointCount * 3);
    const col = new Float32Array(pointCount * 3);

    const cCyan = new THREE.Color('#0EA5E9');
    const cAmber = new THREE.Color('#D97706');
    const cGreen = new THREE.Color('#059669');
    const cWhite = new THREE.Color('#E2E8F0');
    const cBuilding = new THREE.Color('#38BDF8');
    const cVeg = new THREE.Color('#10B981');
    const cTerrain = new THREE.Color('#A16207');

    for (let i = 0; i < pointCount; i++) {
      const typeRand = Math.random();
      let x = 0, y = 0, z = 0;
      let pCol = cCyan.clone();

      if (typeRand < 0.6) {
        x = (Math.random() - 0.5) * 80;
        z = (Math.random() - 0.5) * 80;
        y = getTerrainElevation(x, z) + Math.random() * 0.15;

        if (vizMode === 'classified') {
          pCol = y > 1.5 ? cAmber : cTerrain;
        } else if (vizMode === 'depth') {
          const tDepth = Math.max(0, Math.min(1, (y + 4) / 16));
          pCol.setHSL(0.6 - tDepth * 0.5, 0.9, 0.5);
        } else {
          const t = Math.max(0, Math.min(1, (y + 3) / 10));
          pCol.lerp(cAmber, t * 0.4);
        }
      } else if (typeRand < 0.9) {
        const struct = STRUCTURES[Math.floor(Math.random() * STRUCTURES.length)];
        x = struct.x + (Math.random() - 0.5) * 8;
        z = struct.z + (Math.random() - 0.5) * 8;
        const baseH = getTerrainElevation(struct.x, struct.z);
        y = baseH + Math.random() * (struct.type === 'tower' ? 14 : 6);

        if (vizMode === 'classified') {
          pCol = struct.type === 'solar' ? cCyan : cBuilding;
        } else if (vizMode === 'depth') {
          const tDepth = Math.max(0, Math.min(1, (y + 4) / 16));
          pCol.setHSL(0.6 - tDepth * 0.5, 0.9, 0.55);
        } else {
          pCol = cBuilding.clone().lerp(cWhite, Math.random() * 0.3);
        }
      } else {
        x = (Math.random() - 0.5) * 70;
        z = (Math.random() - 0.5) * 70;
        const terrainY = getTerrainElevation(x, z);
        y = terrainY + 0.5 + Math.random() * 4.0;

        if (vizMode === 'classified') {
          pCol = cVeg;
        } else {
          pCol = cGreen.clone().lerp(cCyan, Math.random() * 0.5);
        }
      }

      pos[i * 3]     = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      col[i * 3]     = pCol.r;
      col[i * 3 + 1] = pCol.g;
      col[i * 3 + 2] = pCol.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, [vizMode]);

  if (!visible && vizMode !== 'pointcloud') return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={vizMode === 'pointcloud' ? 0.16 : 0.10}
        vertexColors
        transparent
        opacity={vizMode === 'pointcloud' ? 0.85 : 0.45}
        sizeAttenuation
      />
    </points>
  );
}

// ---------- 4. Active Stage 5 / 3DGS Swirling Particle Convergence ---

function Stage5ParticleConvergence({ activeStageId }: { activeStageId: string | null }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const is3DGS = activeStageId === 'reconstruction' || activeStageId === null;

  const { geometry, initialPos, centroids } = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const initPos = new Float32Array(count * 3);

    const targetCenters = STRUCTURES.map(s => new THREE.Vector3(s.x, getTerrainElevation(s.x, s.z) + 4, s.z));
    const cCyan = new THREE.Color('#0EA5E9');
    const cAmber = new THREE.Color('#F59E0B');

    for (let i = 0; i < count; i++) {
      const center = targetCenters[i % targetCenters.length];
      const radius = 3 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 8;

      const px = center.x + Math.cos(angle) * radius;
      const py = center.y + height;
      const pz = center.z + Math.sin(angle) * radius;

      pos[i * 3]     = px;
      pos[i * 3 + 1] = py;
      pos[i * 3 + 2] = pz;

      initPos[i * 3]     = px;
      initPos[i * 3 + 1] = py;
      initPos[i * 3 + 2] = pz;

      const color = cCyan.clone().lerp(cAmber, Math.random() * 0.4);
      col[i * 3]     = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return { geometry: geo, initialPos: initPos, centroids: targetCenters };
  }, []);

  // Orbital swirl animation loop inside useFrame (zero React re-renders)
  useFrame((state) => {
    if (!is3DGS || !pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const count = posAttr.count;

    for (let i = 0; i < count; i++) {
      const center = centroids[i % centroids.length];
      const origX = initialPos[i * 3];
      const origZ = initialPos[i * 3 + 2];
      const relX = origX - center.x;
      const relZ = origZ - center.z;

      const currentAngle = Math.atan2(relZ, relX) + time * 0.6;
      const radius = Math.sqrt(relX * relX + relZ * relZ) * (0.85 + Math.sin(time * 2 + i) * 0.15);

      posAttr.setX(i, center.x + Math.cos(currentAngle) * radius);
      posAttr.setY(i, initialPos[i * 3 + 1] + Math.sin(time * 3.0 + i * 0.1) * 0.4);
      posAttr.setZ(i, center.z + Math.sin(currentAngle) * radius);
    }
    posAttr.needsUpdate = true;
  });

  if (!is3DGS) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// ---------- 5. Smooth UAV Trajectory Navigation ----------------

function AdvancedUAVMarker() {
  const droneGroupRef = useRef<THREE.Group>(null!);
  const rotorRefs = useRef<THREE.Mesh[]>([]);
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const groundReticleRef = useRef<THREE.Group>(null!);

  const curve = useMemo(() => getFlightCurve(), []);

  // Smooth Catmull-Rom flight trajectory tracking
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Smooth looping flight position along trajectory
    const pathT = (time * 0.035) % 1.0;
    const currentPos = curve.getPointAt(pathT);
    const tangent = curve.getTangentAt(pathT);

    const posY = 18 + Math.sin(time * 1.5) * 0.25;

    if (droneGroupRef.current) {
      droneGroupRef.current.position.set(currentPos.x, posY, currentPos.z);

      // Smooth heading orientation towards tangent direction
      const headingAngle = Math.atan2(tangent.x, tangent.z);
      droneGroupRef.current.rotation.y = headingAngle;

      // Banking roll angle on turns
      const turnRate = Math.sin(time * 0.8) * 0.08;
      droneGroupRef.current.rotation.z = turnRate;
      droneGroupRef.current.rotation.x = Math.cos(time * 1.4) * 0.03;
    }

    // Spin 6 rotors smoothly inside useFrame
    rotorRefs.current.forEach((r) => {
      if (r) r.rotation.y += 0.45;
    });

    // Ground targeting reticle follows UAV
    if (groundReticleRef.current) {
      const terrainElev = getTerrainElevation(currentPos.x, currentPos.z);
      groundReticleRef.current.position.set(currentPos.x, terrainElev + 0.15, currentPos.z);
      groundReticleRef.current.rotation.z += 0.015;
    }
  });

  const armOffsets: [number, number][] = [
    [-0.8, -0.8], [0.8, -0.8],
    [-0.9, 0],    [0.9, 0],
    [-0.8, 0.8],  [0.8, 0.8],
  ];

  return (
    <>
      <group ref={droneGroupRef}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.25, 1.4]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0.1]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 12]} />
          <meshStandardMaterial color="#0EA5E9" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.35, 0.1]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial color="#059669" />
        </mesh>

        {armOffsets.map(([ax, az], i) => (
          <group key={i} position={[ax * 0.8, 0, az * 0.8]}>
            <mesh rotation={[0, Math.atan2(az, ax), 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
              <meshStandardMaterial color="#0284C7" metalness={0.7} />
            </mesh>
            <mesh
              ref={(el) => { if (el) rotorRefs.current[i] = el; }}
              position={[0, 0.18, 0]}
            >
              <boxGeometry args={[1.2, 0.02, 0.08]} />
              <meshStandardMaterial color="#94A3B8" transparent opacity={0.7} />
            </mesh>
          </group>
        ))}

        <group position={[0, -0.22, 0.3]}>
          <mesh>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.05, 0.1]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
            <meshStandardMaterial color="#0EA5E9" emissive="#0EA5E9" emissiveIntensity={0.5} />
          </mesh>
        </group>

        <spotLight
          ref={spotLightRef}
          position={[0, -0.3, 0]}
          target-position={[0, -18, 0]}
          angle={0.4}
          penumbra={0.5}
          intensity={2.5}
          color="#0EA5E9"
          distance={30}
        />
      </group>

      <group ref={groundReticleRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.1, 32]} />
          <meshBasicMaterial color="#0EA5E9" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.3, 12]} />
          <meshBasicMaterial color="#0EA5E9" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}

// ---------- 6. Trajectory, Trajectory Spark Pulse & Pose Markers ---

function TrajectoryAndPoses({ visible, activeStageId }: { visible: boolean; activeStageId: string | null }) {
  const lineRef = useRef<THREE.Line>(null!);
  const pulseRef = useRef<THREE.Mesh>(null!);

  const curve = useMemo(() => getFlightCurve(), []);

  const { curvePoints, poseTransformations } = useMemo(() => {
    const pts = curve.getPoints(200);
    const poses: { pos: THREE.Vector3; rot: THREE.Euler }[] = [];

    for (let pass = 0; pass < 5; pass++) {
      const z = -22 + pass * 9;
      const dir = pass % 2 === 0 ? 1 : -1;
      const startX = dir * -28;
      const endX = dir * 28;

      for (let p = 0; p < 6; p++) {
        const pX = lerp(startX, endX, p / 5);
        const pos = new THREE.Vector3(pX, 18, z);
        const rot = new THREE.Euler(Math.PI / 2.2, 0, dir === 1 ? 0 : Math.PI);
        poses.push({ pos, rot });
      }
    }
    return { curvePoints: pts, poseTransformations: poses };
  }, [curve]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(curvePoints);
  }, [curvePoints]);

  const isPoseStage = activeStageId === 'frame-curation' || activeStageId === 'pose-estimation';

  // Move pulse spark along trajectory inside useFrame
  useFrame((state) => {
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      const pulseT = (time * 0.07) % 1.0;
      const pos = curve.getPointAt(pulseT);
      pulseRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  if (!visible) return null;

  return (
    <>
      <primitive
        object={new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: '#0EA5E9',
            linewidth: 2,
            transparent: true,
            opacity: isPoseStage ? 0.95 : 0.65,
          })
        )}
        ref={lineRef}
      />

      {/* Travelling Energy Pulse Spark */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.45, 12, 12]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.85} />
      </mesh>

      {/* Camera Pose Markers */}
      {poseTransformations.map((pose, idx) => (
        <group key={idx} position={pose.pos} rotation={pose.rot}>
          <mesh>
            <coneGeometry args={[0.4, 0.7, 4]} />
            <meshBasicMaterial
              color={isPoseStage ? '#10B981' : '#38BDF8'}
              wireframe
              transparent
              opacity={isPoseStage ? 0.85 : 0.45}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

// ---------- 7. Geospatial Boundary & GCP Anchors --------------

function GeospatialBoundary({ visible, activeStageId }: { visible: boolean; activeStageId: string | null }) {
  const boundaryPts = useMemo(() => [
    new THREE.Vector3(-36, 0.4, -30),
    new THREE.Vector3( 36, 0.4, -30),
    new THREE.Vector3( 36, 0.4,  30),
    new THREE.Vector3(-36, 0.4,  30),
    new THREE.Vector3(-36, 0.4, -30),
  ], []);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(boundaryPts), [boundaryPts]);

  const gcps = [
    { name: 'GCP-01 (NW)', x: -36, z:  30 },
    { name: 'GCP-02 (NE)', x:  36, z:  30 },
    { name: 'GCP-03 (SE)', x:  36, z: -30 },
    { name: 'GCP-04 (SW)', x: -36, z: -30 },
    { name: 'GCP-05 (CTR)', x:  0, z:   0 },
  ];

  const isGeoStage = activeStageId === 'georeferencing';

  if (!visible) return null;

  return (
    <>
      <primitive
        object={new THREE.Line(
          geo,
          new THREE.LineDashedMaterial({
            color: '#D97706',
            dashSize: 2,
            gapSize: 1,
            transparent: true,
            opacity: 0.75,
          })
        )}
        onUpdate={(self: THREE.Line) => self.computeLineDistances()}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <planeGeometry args={[72, 60]} />
        <meshBasicMaterial color="#0EA5E9" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {gcps.map((g, i) => {
        const elev = getTerrainElevation(g.x, g.z);
        return (
          <group key={i} position={[g.x, elev + 0.2, g.z]}>
            <mesh>
              <sphereGeometry args={[0.35, 12, 12]} />
              <meshStandardMaterial
                color="#059669"
                emissive="#059669"
                emissiveIntensity={isGeoStage ? 0.9 : 0.4}
              />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.8, 1.0, 16]} />
              <meshBasicMaterial color="#059669" transparent opacity={isGeoStage ? 0.9 : 0.6} side={THREE.DoubleSide} />
            </mesh>
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.8}
              color="#10B981"
              anchorX="center"
              anchorY="bottom"
            >
              {g.name}
            </Text>
          </group>
        );
      })}
    </>
  );
}

// ---------- 8. Reconstruction Scan Activity Highlight ----------

function ReconstructionScanHighlight() {
  const scanRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (scanRef.current) {
      const t = (state.clock.getElapsedTime() * 0.12) % 1.0;
      const zPos = -30 + t * 60;
      scanRef.current.position.z = zPos;
    }
  });

  return (
    <mesh ref={scanRef} position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 2]} />
      <meshBasicMaterial
        color="#0EA5E9"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------- 9. Camera Reset Helper -----------------------------

function CameraResetter({ trigger }: { trigger: number }) {
  const { camera } = useThree();
  useEffect(() => {
    if (trigger === 0) return;
    camera.position.set(45, 32, 45);
    camera.lookAt(0, 2, 0);
  }, [trigger, camera]);
  return null;
}

// ---------- 10. Complete Scene Orchestrator ---------------------

interface SceneProps {
  vizMode: VisualizationMode;
  showGrid: boolean;
  showTrajectory: boolean;
  showSurveyBoundary: boolean;
  showPointCloud: boolean;
  activeStageId: string | null;
  resetTrigger: number;
}

function Scene({ vizMode, showGrid, showTrajectory, showSurveyBoundary, showPointCloud, activeStageId, resetTrigger }: SceneProps) {
  return (
    <>
      <CameraResetter trigger={resetTrigger} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[35, 45, 25]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-30, 20, -20]} intensity={0.3} color="#38BDF8" />
      <hemisphereLight args={['#1E293B', '#07090E', 0.45]} />

      <fog attach="fog" args={['#0C1018', 65, 130]} />
      <color attach="background" args={['#0C1018']} />

      {showGrid && (
        <Grid
          args={[100, 100]}
          position={[0, -0.05, 0]}
          cellSize={2}
          cellThickness={0.4}
          cellColor="#1A2535"
          sectionSize={10}
          sectionThickness={0.8}
          sectionColor="#273548"
          fadeDistance={90}
          fadeStrength={1}
        />
      )}

      {/* Terrain Elevation Surface */}
      <Terrain vizMode={vizMode} activeStageId={activeStageId} />

      {/* Procedural Reconstructed Structures */}
      <Structures vizMode={vizMode} activeStageId={activeStageId} />

      {/* Dense Surface-Aligned Point Cloud */}
      <DensePointCloud visible={showPointCloud} vizMode={vizMode} />

      {/* Active Stage 5 / 3DGS Particle Swirl Convergence */}
      <Stage5ParticleConvergence activeStageId={activeStageId} />

      {/* Survey Boundary & GCP Anchors */}
      <GeospatialBoundary visible={showSurveyBoundary} activeStageId={activeStageId} />

      {/* Flight Path & Camera Poses */}
      <TrajectoryAndPoses visible={showTrajectory} activeStageId={activeStageId} />

      {/* Active Scan Activity Highlight */}
      <ReconstructionScanHighlight />

      {/* Smooth Trajectory UAV Hexacopter */}
      <AdvancedUAVMarker />

      {/* Cardinal Direction Text Labels */}
      <Text position={[-38, 1.0, -32]} fontSize={1.1} color="#4A6180" anchorX="left">SW</Text>
      <Text position={[ 38, 1.0, -32]} fontSize={1.1} color="#4A6180" anchorX="right">SE</Text>
      <Text position={[-38, 1.0,  32]} fontSize={1.1} color="#4A6180" anchorX="left">NW</Text>
      <Text position={[ 38, 1.0,  32]} fontSize={1.1} color="#4A6180" anchorX="right">NE</Text>

      {/* Orientation Axis Viewport */}
      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport
          axisColors={['#DC2626', '#059669', '#0EA5E9']}
          labelColor="white"
        />
      </GizmoHelper>

      {/* Orbit Navigation Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.06}
        minDistance={5}
        maxDistance={120}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 2, 0]}
      />
    </>
  );
}

// ---------- 11. UI Control Overlays ----------------------------

interface VizBtnProps {
  label: string;
  mode: VisualizationMode;
  active: boolean;
  onClick: () => void;
}

function VizBtn({ label, active, onClick }: VizBtnProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '4px 10px',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
        background: active ? 'rgba(14,165,233,0.25)' : 'rgba(0,0,0,0.55)',
        color: active ? 'var(--accent-primary)' : 'var(--text-muted)',
        border: `1px solid ${active ? 'rgba(14,165,233,0.5)' : 'rgba(26,37,53,0.9)'}`,
        borderRadius: 3,
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 150ms ease-out',
      }}
    >
      {label}
    </button>
  );
}

interface ToggleBtnProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function ToggleBtn({ label, active, onClick }: ToggleBtnProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      title={`Toggle ${label}`}
      style={{
        padding: '4px 8px',
        fontSize: 10,
        fontWeight: 500,
        fontFamily: 'var(--font-mono)',
        background: active ? 'rgba(5,150,105,0.2)' : 'rgba(0,0,0,0.55)',
        color: active ? 'var(--status-success)' : 'var(--text-muted)',
        border: `1px solid ${active ? 'rgba(5,150,105,0.4)' : 'rgba(26,37,53,0.9)'}`,
        borderRadius: 3,
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 150ms ease-out',
      }}
    >
      {label}
    </button>
  );
}

// ---------- Main Exported Viewport Component --------------------

interface Props {
  vizMode: VisualizationMode;
  setVizMode: (m: VisualizationMode) => void;
  showGrid: boolean;
  toggleGrid: () => void;
  showTrajectory: boolean;
  toggleTrajectory: () => void;
  showSurveyBoundary: boolean;
  toggleSurveyBoundary: () => void;
  showPointCloud: boolean;
  togglePointCloud: () => void;
}

export function ReconstructionViewport({
  vizMode, setVizMode,
  showGrid, toggleGrid,
  showTrajectory, toggleTrajectory,
  showSurveyBoundary, toggleSurveyBoundary,
  showPointCloud, togglePointCloud,
}: Props) {
  const [resetTrigger, setResetTrigger] = useState(0);
  const { activeStageId } = useReconStore();

  const modes: { label: string; mode: VisualizationMode }[] = [
    { label: 'Realistic',   mode: 'realistic'   },
    { label: 'Pt. Cloud',   mode: 'pointcloud'  },
    { label: 'Wireframe',   mode: 'wireframe'   },
    { label: 'Depth',       mode: 'depth'       },
    { label: 'Classified',  mode: 'classified'  },
  ];

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', background: '#0C1018' }}
      role="region"
      aria-label="3D Reconstruction Viewport"
    >
      <Canvas
        shadows
        camera={{ position: [45, 32, 45], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          vizMode={vizMode}
          showGrid={showGrid}
          showTrajectory={showTrajectory}
          showSurveyBoundary={showSurveyBoundary}
          showPointCloud={showPointCloud}
          activeStageId={activeStageId}
          resetTrigger={resetTrigger}
        />
      </Canvas>

      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          display: 'flex',
          gap: 4,
          backdropFilter: 'blur(8px)',
        }}
      >
        {modes.map(({ label, mode }) => (
          <VizBtn
            key={mode}
            label={label}
            mode={mode}
            active={vizMode === mode}
            onClick={() => setVizMode(mode)}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          gap: 4,
          backdropFilter: 'blur(8px)',
        }}
      >
        <ToggleBtn label="Grid"       active={showGrid}          onClick={toggleGrid} />
        <ToggleBtn label="Trajectory" active={showTrajectory}    onClick={toggleTrajectory} />
        <ToggleBtn label="Boundary"   active={showSurveyBoundary} onClick={toggleSurveyBoundary} />
        <ToggleBtn label="Pt Cloud"   active={showPointCloud}     onClick={togglePointCloud} />
        <button
          onClick={() => setResetTrigger((n) => n + 1)}
          title="Reset camera"
          style={{
            padding: '4px 10px',
            fontSize: 10,
            fontWeight: 500,
            fontFamily: 'var(--font-mono)',
            background: 'rgba(0,0,0,0.55)',
            color: 'var(--text-muted)',
            border: '1px solid rgba(26,37,53,0.9)',
            borderRadius: 3,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          Reset Cam
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          fontSize: 9,
          color: 'rgba(74,97,128,0.7)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        MODE: {vizMode.toUpperCase()} · ORBIT ✦ PAN ✦ ZOOM
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 12,
          right: 68,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <div style={{ width: 80, height: 1, background: 'rgba(74,97,128,0.5)' }} />
        <div style={{ fontSize: 9, color: 'rgba(74,97,128,0.7)', fontFamily: 'var(--font-mono)' }}>
          ≈ 160 m
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
          background: 'rgba(0,0,0,0.65)',
          border: '1px solid rgba(14,165,233,0.25)',
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        <span style={{ color: 'var(--accent-primary)' }}>■</span>
        MISSION-0842 · RANN OF KUTCH ZONE 4C · 3DGS DIGITAL TWIN
      </div>
    </div>
  );
}
