// ============================================================
// AERIS — Phase 6 Primary Digital Twin 3D Viewport Preview
// Reusable R3F spatial renderer for reconstructed mission output
// Expanded high-visibility representation section (620px height + full-screen toggle)
// ============================================================

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei';
import { ArrowsOutSimple, ArrowsInSimple } from '@phosphor-icons/react';
import * as THREE from 'three';
import type { ViewModeOption } from '../types';

// ---------- Terrain Height & Flight Curve Math Helpers ----------

function getTerrainElevation(x: number, z: number): number {
  const hill1 = Math.sin(x * 0.08) * Math.cos(z * 0.07) * 3.5;
  const hill2 = Math.sin(x * 0.18 + 1.2) * Math.cos(z * 0.15 - 0.5) * 1.5;
  const ridge = Math.abs(Math.sin((x + z) * 0.05)) * 2.0;
  const valley = -Math.exp(-Math.pow((x * 0.06 - z * 0.04), 2)) * 3.0;
  return hill1 + hill2 + ridge + valley;
}

function getFlightTrajectoryPoints(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let pass = 0; pass < 5; pass++) {
    const z = -20 + pass * 10;
    const dir = pass % 2 === 0 ? 1 : -1;
    pts.push(new THREE.Vector3(dir * -24, 16, z));
    pts.push(new THREE.Vector3(dir * 24, 16, z));
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  return curve.getPoints(120);
}

// ---------- Reconstructed 3D Scene Component ----------

function ReconstructedScene({ viewMode }: { viewMode: ViewModeOption }) {
  const groupRef = useRef<THREE.Group>(null);
  const trajectoryPoints = useMemo(() => getFlightTrajectoryPoints(), []);

  // Subtle slow orbital rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  // Terrain Geometry
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 80, 80);
    const pos = geo.attributes.position;
    const count = pos.count;
    const colors = new Float32Array(count * 3);

    const cLow = new THREE.Color('#1B2838');
    const cMid = new THREE.Color('#2C4258');
    const cHigh = new THREE.Color('#385E7B');

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const elev = getTerrainElevation(x, z);
      pos.setY(i, elev);

      let col = cLow.clone();
      if (viewMode === 'elevation') {
        const t = Math.max(0, Math.min(1, (elev + 3) / 8));
        col.setHSL((1 - t) * 0.65, 0.9, 0.45);
      } else {
        if (elev > 2.0) col.lerp(cHigh, (elev - 2.0) / 3.0);
        else if (elev > 0.0) col.lerp(cMid, elev / 2.0);
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [viewMode]);

  // Point Cloud Particles
  const pointCloudGeo = useMemo(() => {
    const count = 9000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 85;
      const z = (Math.random() - 0.5) * 85;
      const elev = getTerrainElevation(x, z) + Math.random() * 0.6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = elev;
      positions[i * 3 + 2] = z;

      colors[i * 3] = 0.05;
      colors[i * 3 + 1] = 0.65 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.92;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Flight Trajectory Curve */}
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                trajectoryPoints.flatMap((p) => [p.x, p.y, p.z])
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#0EA5E9" linewidth={2} opacity={0.75} transparent />
      </line>

      {/* Reconstructed Structures / Bounding Boxes */}
      <group position={[6, 5, -8]}>
        <mesh>
          <boxGeometry args={[16, 10, 14]} />
          {viewMode === 'wireframe' ? (
            <meshBasicMaterial color="#0EA5E9" wireframe />
          ) : viewMode === 'pointcloud' ? (
            <meshBasicMaterial color="#0EA5E9" wireframe opacity={0.3} transparent />
          ) : (
            <meshStandardMaterial color="#2A3C54" roughness={0.3} metalness={0.8} />
          )}
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(16, 10, 14)]} />
          <lineBasicMaterial color="#0EA5E9" />
        </lineSegments>
      </group>

      <group position={[-14, 4, 12]}>
        <mesh>
          <boxGeometry args={[12, 8, 12]} />
          {viewMode === 'wireframe' ? (
            <meshBasicMaterial color="#38BDF8" wireframe />
          ) : (
            <meshStandardMaterial color="#1E2D40" roughness={0.4} metalness={0.7} />
          )}
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(12, 8, 12)]} />
          <lineBasicMaterial color="#38BDF8" opacity={0.85} transparent />
        </lineSegments>
      </group>

      {/* Main Terrain Surface */}
      {viewMode === 'pointcloud' ? (
        <points geometry={pointCloudGeo}>
          <pointsMaterial size={0.4} vertexColors transparent opacity={0.88} sizeAttenuation />
        </points>
      ) : viewMode === 'wireframe' ? (
        <mesh geometry={terrainGeo}>
          <meshBasicMaterial color="#0EA5E9" wireframe />
        </mesh>
      ) : (
        <mesh geometry={terrainGeo}>
          <meshStandardMaterial vertexColors roughness={0.85} metalness={0.15} />
        </mesh>
      )}

      {/* Grid Floor Context */}
      <Grid
        position={[0, -4, 0]}
        args={[120, 120]}
        cellSize={5}
        cellThickness={1}
        cellColor="#1E293B"
        sectionSize={20}
        sectionThickness={1.5}
        sectionColor="#0EA5E9"
        fadeDistance={110}
        infiniteGrid
      />
    </group>
  );
}

// ---------- Main Viewport Container Component ----------

export const DigitalTwinPreview: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewModeOption>('realistic');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        position: isExpanded ? 'fixed' : 'relative',
        top: isExpanded ? 0 : undefined,
        left: isExpanded ? 0 : undefined,
        right: isExpanded ? 0 : undefined,
        bottom: isExpanded ? 0 : undefined,
        zIndex: isExpanded ? 99999 : undefined,
        width: '100%',
        height: isExpanded ? '100vh' : '620px',
        background: 'var(--bg-app)',
        border: '1px solid var(--border-base)',
        borderRadius: isExpanded ? 0 : 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-panel)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 3D Canvas */}
      <Canvas style={{ background: '#06090F' }}>
        <PerspectiveCamera makeDefault position={[36, 26, 44]} fov={45} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[40, 60, 20]} intensity={1.4} castShadow />
        <directionalLight position={[-30, 20, -30]} intensity={0.5} color="#0EA5E9" />

        <ReconstructedScene viewMode={viewMode} />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={12}
          maxDistance={140}
        />
      </Canvas>

      {/* Top Left: View Mode Controls */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          zIndex: 10,
          background: 'rgba(12, 16, 24, 0.88)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          display: 'flex',
          gap: 4,
        }}
      >
        {(['realistic', 'pointcloud', 'wireframe', 'elevation'] as ViewModeOption[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '6px 12px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-xs)',
              border: viewMode === mode ? '1px solid var(--accent-primary)' : '1px solid transparent',
              background: viewMode === mode ? 'rgba(14,165,233,0.2)' : 'transparent',
              color: viewMode === mode ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Top Right: Status Badge & Fullscreen Expand Toggle */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* Expand / Minimize Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Minimize Viewport' : 'Expand Viewport Fullscreen'}
          style={{
            background: 'rgba(12, 16, 24, 0.88)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--accent-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 10px',
            color: 'var(--accent-primary)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all var(--transition-fast)',
          }}
        >
          {isExpanded ? <ArrowsInSimple size={15} weight="bold" /> : <ArrowsOutSimple size={15} weight="bold" />}
          <span>{isExpanded ? 'COLLAPSE' : 'EXPAND VIEWPORT'}</span>
        </button>

        {/* Status Badge */}
        <div
          style={{
            background: 'rgba(12, 16, 24, 0.88)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(14,165,233,0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--accent-primary)',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)',
            }}
          />
          <span>RECONSTRUCTED SPATIAL TWIN</span>
        </div>
      </div>

      {/* Bottom Overlay: Monospace Engineering Metadata */}
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          left: 14,
          right: 14,
          zIndex: 10,
          background: 'rgba(12, 16, 24, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-base)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              MODEL
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              3D TILESET / GLB
            </span>
          </div>

          <div style={{ width: 1, height: 22, background: 'var(--border-base)' }} />

          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              COORDINATE SYSTEM
            </span>
            <span style={{ fontSize: 11, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              EPSG:32643 (UTM 43N)
            </span>
          </div>

          <div style={{ width: 1, height: 22, background: 'var(--border-base)' }} />

          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              GSD
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              2.1 cm/px
            </span>
          </div>

          <div style={{ width: 1, height: 22, background: 'var(--border-base)' }} />

          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              POLYGONS
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              14.2M
            </span>
          </div>

          <div style={{ width: 1, height: 22, background: 'var(--border-base)' }} />

          <div>
            <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'block' }}>
              CONFIDENCE
            </span>
            <span style={{ fontSize: 11, color: 'var(--status-success)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              99.4%
            </span>
          </div>
        </div>

        <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          ORBIT: LMB | PAN: RMB | ZOOM: SCROLL
        </div>
      </div>
    </div>
  );
};
