// ============================================================
// AERIS — 3D Digital Twin Main Viewport Component
// R3F 3D spatial viewer with layer toggles, view mode shaders,
// raycast object selection, and live 3D measurement overlays
// ============================================================

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Grid,
  Text,
  GizmoHelper,
  GizmoViewport,
} from '@react-three/drei';
import * as THREE from 'three';
import { useDigitalTwinStore } from '../hooks/useDigitalTwinStore';
import { MOCK_TWIN_FEATURES } from '../data';
import type { Vector3D } from '../types';

// ---------- Math & Height Helpers -----------------------------

function getTerrainElevation(x: number, z: number): number {
  const hill1 = Math.sin(x * 0.08) * Math.cos(z * 0.07) * 3.5;
  const hill2 = Math.sin(x * 0.18 + 1.2) * Math.cos(z * 0.15 - 0.5) * 1.5;
  const ridge = Math.abs(Math.sin((x + z) * 0.05)) * 2.0;
  const valley = -Math.exp(-Math.pow((x * 0.06 - z * 0.04), 2)) * 3.0;
  const detail = Math.sin(x * 0.4 + z * 0.3) * 0.4;
  return hill1 + hill2 + ridge + valley + detail;
}

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

// ---------- Terrain Mesh & Orthomosaic / DSM Overlays ---------

function TerrainSurface() {
  const { viewMode, layers } = useDigitalTwinStore();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 96, 96);
    const pos = geo.attributes.position;
    const count = pos.count;
    const colorArr = new Float32Array(count * 3);

    const cLow = new THREE.Color('#2C3823');
    const cMid = new THREE.Color('#4A5636');
    const cHigh = new THREE.Color('#6E6B52');
    const cPeak = new THREE.Color('#888470');

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const elev = getTerrainElevation(x, z);
      pos.setY(i, elev);

      let col = cLow.clone();
      if (viewMode === 'elevation') {
        // DEM height spectrum (blue -> green -> yellow -> red)
        const tHeight = Math.max(0, Math.min(1, (elev + 4) / 10));
        col.setHSL((1 - tHeight) * 0.7, 0.95, 0.5);
      } else {
        if (elev > 2.5) col.lerp(cPeak, Math.min(1, (elev - 2.5) / 3.0));
        else if (elev > 0.5) col.lerp(cHigh, (elev - 0.5) / 2.0);
        else if (elev > -1.0) col.lerp(cMid, (elev + 1.0) / 1.5);
      }

      colorArr[i * 3]     = col.r;
      colorArr[i * 3 + 1] = col.g;
      colorArr[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    return geo;
  }, [viewMode]);

  const material = useMemo(() => {
    switch (viewMode) {
      case 'wireframe':
        return new THREE.MeshBasicMaterial({ color: '#0EA5E9', wireframe: true });
      case 'pointcloud':
        return new THREE.PointsMaterial({ color: '#0EA5E9', size: 0.12, transparent: true, opacity: 0.65 });
      case 'elevation':
      case 'classified':
      default:
        return new THREE.MeshStandardMaterial({
          vertexColors: true,
          roughness: 0.88,
          metalness: 0.04,
        });
    }
  }, [viewMode]);

  if (!layers.terrain) return null;

  if (viewMode === 'pointcloud') {
    return <points geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />;
  }

  return (
    <mesh geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />
  );
}

// ---------- Orthomosaic Map Layer Overlay ----------------------

function OrthomosaicOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
      <planeGeometry args={[70, 60]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ---------- DSM Grid Overlay -----------------------------------

function DSMGridOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <Grid
      args={[70, 60]}
      position={[0, 0.1, 0]}
      cellSize={1}
      cellThickness={0.6}
      cellColor="#F59E0B"
      sectionSize={5}
      sectionThickness={1.2}
      sectionColor="#D97706"
      fadeDistance={80}
    />
  );
}

// ---------- Reconstructed Building Structures & Click Selection ---

function ReconstructedStructures() {
  const { viewMode, layers, selectedFeature, setSelectedFeature, measurementMode, addMeasurementPoint } = useDigitalTwinStore();

  const handlePointerDown = (e: any, featureId: string) => {
    e.stopPropagation();

    if (measurementMode !== 'none') {
      const pt: Vector3D = {
        x: e.point.x,
        y: e.point.y,
        z: e.point.z,
      };
      addMeasurementPoint(pt);
      return;
    }

    const feat = MOCK_TWIN_FEATURES.find((f) => f.id === featureId) || null;
    setSelectedFeature(feat);
  };

  if (!layers.mesh || viewMode === 'pointcloud') return null;

  return (
    <>
      {MOCK_TWIN_FEATURES.map((feat) => {
        const isSelected = selectedFeature?.id === feat.id;
        let pos: [number, number, number] = [0, 0, 0];
        let size: [number, number, number] = [4, 4, 4];

        switch (feat.id) {
          case 'feat-tower-01':
            pos = [14, feat.dimensions.heightM / 2 + getTerrainElevation(14, -4), -4];
            size = [7, 16.5, 7];
            break;
          case 'feat-office-01':
            pos = [-8, feat.dimensions.heightM / 2 + getTerrainElevation(-8, -8), -8];
            size = [10, 6.8, 8.5];
            break;
          case 'feat-warehouse-01':
            pos = [-16, feat.dimensions.heightM / 2 + getTerrainElevation(-16, 6), 6];
            size = [12, 5.2, 8];
            break;
          case 'feat-infra-01':
            pos = [8, feat.dimensions.heightM / 2 + getTerrainElevation(8, -16), -16];
            size = [6, 10.2, 5];
            break;
          case 'feat-solar-01':
            pos = [-4, feat.dimensions.heightM / 2 + getTerrainElevation(-4, 14), 14];
            size = [7, 1.2, 6];
            break;
        }

        const baseColor =
          viewMode === 'classified'
            ? feat.type === 'Solar Array' ? '#0284C7' : feat.type === 'Infrastructure' ? '#C2410C' : '#3A6A8A'
            : viewMode === 'elevation'
            ? '#38BDF8'
            : '#4E6375';

        const color = isSelected ? '#0EA5E9' : baseColor;

        return (
          <mesh
            key={feat.id}
            position={pos}
            onPointerDown={(e) => handlePointerDown(e, feat.id)}
            castShadow
            receiveShadow
          >
            <boxGeometry args={size} />
            <meshStandardMaterial
              color={color}
              wireframe={viewMode === 'wireframe'}
              roughness={0.5}
              metalness={0.2}
              emissive={isSelected ? '#0EA5E9' : '#000000'}
              emissiveIntensity={isSelected ? 0.35 : 0.0}
            />
          </mesh>
        );
      })}
    </>
  );
}

// ---------- 3D Dense Point Cloud -------------------------------

function DensePointCloud() {
  const { viewMode, layers } = useDigitalTwinStore();

  const geometry = useMemo(() => {
    const count = 16000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cCyan = new THREE.Color('#0EA5E9');
    const cAmber = new THREE.Color('#D97706');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      const y = getTerrainElevation(x, z) + Math.random() * 0.2;

      pos[i * 3]     = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      let pCol = cCyan.clone();
      if (viewMode === 'elevation') {
        const tHeight = Math.max(0, Math.min(1, (y + 4) / 10));
        pCol.setHSL((1 - tHeight) * 0.7, 0.95, 0.5);
      } else {
        pCol.lerp(cAmber, Math.random() * 0.4);
      }

      col[i * 3]     = pCol.r;
      col[i * 3 + 1] = pCol.g;
      col[i * 3 + 2] = pCol.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geo;
  }, [viewMode]);

  if (!layers.pointCloud && viewMode !== 'pointcloud') return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={viewMode === 'pointcloud' ? 0.16 : 0.10}
        vertexColors
        transparent
        opacity={viewMode === 'pointcloud' ? 0.85 : 0.45}
        sizeAttenuation
      />
    </points>
  );
}

// ---------- Trajectory, UAV Marker & Timeline Synchronization ---

function SynchronizedUAVAndTrajectory() {
  const { layers, timelineProgress } = useDigitalTwinStore();
  const droneRef = useRef<THREE.Group>(null!);

  const curve = useMemo(() => getFlightCurve(), []);
  const pathD = useMemo(() => {
    const pts = curve.getPoints(200);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [curve]);

  // Position UAV strictly based on timeline progress %
  const currentPos = curve.getPointAt(timelineProgress / 100);
  const tangent = curve.getTangentAt(timelineProgress / 100);
  const headingAngle = Math.atan2(tangent.x, tangent.z);

  return (
    <>
      {/* Trajectory Polyline */}
      {layers.trajectory && (
        <primitive
          object={new THREE.Line(
            pathD,
            new THREE.LineBasicMaterial({ color: '#0EA5E9', linewidth: 2, transparent: true, opacity: 0.7 })
          )}
        />
      )}

      {/* UAV Platform */}
      <group
        ref={droneRef}
        position={[currentPos.x, 18, currentPos.z]}
        rotation={[0, headingAngle, 0]}
      >
        <mesh castShadow>
          <boxGeometry args={[0.9, 0.25, 1.4]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.22, 0.1]}>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 12]} />
          <meshStandardMaterial color="#0EA5E9" />
        </mesh>
        {/* Sensor Downward Beam Cone */}
        <spotLight
          position={[0, -0.3, 0]}
          target-position={[0, -18, 0]}
          angle={0.4}
          penumbra={0.5}
          intensity={2.5}
          color="#0EA5E9"
          distance={30}
        />
      </group>

      {/* Ground Target Ring */}
      <group position={[currentPos.x, getTerrainElevation(currentPos.x, currentPos.z) + 0.15, currentPos.z]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.1, 32]} />
          <meshBasicMaterial color="#0EA5E9" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
}

// ---------- Survey Boundary & GCP Anchors ----------------------

function SurveyBoundaryAndGCPs() {
  const { layers } = useDigitalTwinStore();

  const boundaryPts = useMemo(() => [
    new THREE.Vector3(-36, 0.4, -30),
    new THREE.Vector3( 36, 0.4, -30),
    new THREE.Vector3( 36, 0.4,  30),
    new THREE.Vector3(-36, 0.4,  30),
    new THREE.Vector3(-36, 0.4, -30),
  ], []);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(boundaryPts), [boundaryPts]);

  if (!layers.surveyBoundary) return null;

  return (
    <>
      <primitive
        object={new THREE.Line(
          geo,
          new THREE.LineDashedMaterial({ color: '#D97706', dashSize: 2, gapSize: 1, transparent: true, opacity: 0.75 })
        )}
        onUpdate={(self: THREE.Line) => self.computeLineDistances()}
      />
    </>
  );
}

// ---------- 3D Measurement Visual Overlays -------------------

function MeasurementOverlays() {
  const { measurementPoints, completedMeasurements, addMeasurementPoint, measurementMode } = useDigitalTwinStore();

  // Terrain click listener for measurement point placement
  const handleGroundClick = (e: any) => {
    if (measurementMode === 'none') return;
    e.stopPropagation();
    addMeasurementPoint({ x: e.point.x, y: e.point.y, z: e.point.z });
  };

  return (
    <group onPointerDown={handleGroundClick}>
      {/* Active in-progress points */}
      {measurementPoints.map((pt, i) => (
        <group key={i} position={[pt.x, pt.y, pt.z]}>
          <mesh>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
          <Text position={[0, 0.8, 0]} fontSize={0.7} color="#38BDF8" anchorX="center">
            P{i + 1}
          </Text>
        </group>
      ))}

      {/* Render completed measurements */}
      {completedMeasurements.map((m) => {
        if (m.points.length < 2) return null;

        const ptsVec = m.points.map((p) => new THREE.Vector3(p.x, p.y, p.z));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(
          m.type === 'area' ? [...ptsVec, ptsVec[0]] : ptsVec
        );

        // Center calculation for label
        const midX = ptsVec.reduce((acc, p) => acc + p.x, 0) / ptsVec.length;
        const midY = ptsVec.reduce((acc, p) => acc + p.y, 0) / ptsVec.length;
        const midZ = ptsVec.reduce((acc, p) => acc + p.z, 0) / ptsVec.length;

        return (
          <group key={m.id}>
            {/* Line segment */}
            <primitive
              object={new THREE.Line(
                lineGeo,
                new THREE.LineBasicMaterial({ color: '#10B981', linewidth: 3 })
              )}
            />

            {/* End Point Markers */}
            {ptsVec.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[0.25, 8, 8]} />
                <meshBasicMaterial color="#10B981" />
              </mesh>
            ))}

            {/* Floating Measurement Label */}
            <Text
              position={[midX, midY + 1.2, midZ]}
              fontSize={0.85}
              color="#10B981"
              anchorX="center"
              anchorY="bottom"
            >
              {m.formattedValue}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// ---------- Camera Reset Helper --------------------------------

function CameraResetter({ trigger }: { trigger: number }) {
  const { camera } = useThree();
  useEffect(() => {
    if (trigger === 0) return;
    camera.position.set(45, 32, 45);
    camera.lookAt(0, 2, 0);
  }, [trigger, camera]);
  return null;
}

// ---------- Main Scene Container -------------------------------

function DigitalTwinScene({ resetTrigger }: { resetTrigger: number }) {
  const { layers } = useDigitalTwinStore();

  return (
    <>
      <CameraResetter trigger={resetTrigger} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[35, 45, 25]} intensity={1.5} castShadow />
      <directionalLight position={[-30, 20, -20]} intensity={0.3} color="#38BDF8" />
      <hemisphereLight args={['#1E293B', '#07090E', 0.45]} />

      <fog attach="fog" args={['#0C1018', 65, 130]} />
      <color attach="background" args={['#0C1018']} />

      {/* DEM Terrain & Layers */}
      <TerrainSurface />
      <OrthomosaicOverlay visible={layers.orthomosaic} />
      <DSMGridOverlay visible={layers.dsm} />

      {/* 3D Meshes & Point Cloud */}
      <ReconstructedStructures />
      <DensePointCloud />

      {/* Flight & Boundary */}
      <SynchronizedUAVAndTrajectory />
      <SurveyBoundaryAndGCPs />

      {/* 3D Measurement Visual Overlay Layer */}
      <MeasurementOverlays />

      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#DC2626', '#059669', '#0EA5E9']} labelColor="white" />
      </GizmoHelper>

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

// ---------- Main Viewport Wrapper ------------------------------

export function DigitalTwinViewport() {
  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', background: '#0C1018' }}
      role="region"
      aria-label="3D Digital Twin Viewport"
    >
      <Canvas
        shadows
        camera={{ position: [45, 32, 45], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <DigitalTwinScene resetTrigger={resetTrigger} />
      </Canvas>

      {/* Reset Camera Floating Button */}
      <button
        onClick={() => setResetTrigger((n) => n + 1)}
        title="Reset camera angle"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
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

      {/* Navigation Watermark */}
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
        AERIS 3D TWIN ENGINE · ORBIT ✦ PAN ✦ ZOOM ✦ SELECT
      </div>
    </div>
  );
}
