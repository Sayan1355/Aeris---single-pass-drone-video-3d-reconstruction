// ============================================================
// AERIS — Main Geospatial Map Viewport (Cesium / Resium Integration)
// Interactive WebGL geographic map viewer centered on Rann of Kutch Zone 4C
// ============================================================

import { useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';
import { useGeospatialStore } from '../hooks/useGeospatialStore';
import { MOCK_GEO_FEATURES } from '../data';
import type { GeoPoint } from '../types';

// ---------- Math & Coordinate Conversion Helpers --------------

/** Convert Lat/Lon offsets around Rann of Kutch (23.8765°N, 70.4321°E) to 3D Viewport X/Z */
function geoToViewportPos(lat: number, lon: number, elev: number = 0): [number, number, number] {
  const centerLat = 23.8765;
  const centerLon = 70.4321;
  // 0.01 deg lat approx 1.11 km, 0.01 deg lon approx 1.01 km
  const x = (lon - centerLon) * 7000;
  const z = -(lat - centerLat) * 7000;
  const y = elev * 0.4;
  return [x, y, z];
}

function getTerrainElevation(x: number, z: number): number {
  const hill1 = Math.sin(x * 0.08) * Math.cos(z * 0.07) * 3.5;
  const hill2 = Math.sin(x * 0.18 + 1.2) * Math.cos(z * 0.15 - 0.5) * 1.5;
  const valley = -Math.exp(-Math.pow((x * 0.06 - z * 0.04), 2)) * 3.0;
  return hill1 + hill2 + valley + 18.0;
}

// ---------- Geographic Terrain & Imagery Surface ----------------

function GeographicTerrain() {
  const { vizMode } = useGeospatialStore();

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 100, 96, 96);
    const pos = geo.attributes.position;
    const count = pos.count;
    const colorArr = new Float32Array(count * 3);

    const cLow = new THREE.Color('#1E2A38');
    const cMid = new THREE.Color('#3A4B5C');
    const cHigh = new THREE.Color('#5A6C7D');
    const cCoverage = new THREE.Color('#059669');

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const elev = getTerrainElevation(x, z);
      pos.setY(i, elev * 0.25);

      let col = cLow.clone();
      if (vizMode === 'elevation') {
        const tHeight = Math.max(0, Math.min(1, (elev - 10) / 20));
        col.setHSL((1 - tHeight) * 0.7, 0.9, 0.45);
      } else if (vizMode === 'coverage') {
        col = Math.abs(x) < 35 && Math.abs(z) < 28 ? cCoverage : cLow;
      } else if (vizMode === 'classified') {
        col = elev > 22 ? cHigh : elev > 16 ? cMid : cLow;
      } else {
        // Satellite base dark imagery
        col.lerp(cMid, Math.max(0, Math.min(1, elev / 30)));
      }

      colorArr[i * 3]     = col.r;
      colorArr[i * 3 + 1] = col.g;
      colorArr[i * 3 + 2] = col.b;
    }

    geo.computeVertexNormals();
    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    return geo;
  }, [vizMode]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.1,
    });
  }, []);

  return <mesh geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} receiveShadow />;
}

// ---------- Survey Boundary & Coverage Heatmap Polygon ---------

function SurveyBoundaryOverlay() {
  const { layers, vizMode } = useGeospatialStore();

  const boundaryPts = useMemo(() => [
    new THREE.Vector3(-38, 0.3, -30),
    new THREE.Vector3( 38, 0.3, -30),
    new THREE.Vector3( 38, 0.3,  30),
    new THREE.Vector3(-38, 0.3,  30),
    new THREE.Vector3(-38, 0.3, -30),
  ], []);

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(boundaryPts), [boundaryPts]);

  return (
    <>
      {layers.surveyBoundary && (
        <primitive
          object={new THREE.Line(
            geo,
            new THREE.LineDashedMaterial({ color: '#D97706', dashSize: 2, gapSize: 1, transparent: true, opacity: 0.8 })
          )}
          onUpdate={(self: THREE.Line) => self.computeLineDistances()}
        />
      )}

      {/* Coverage Heat Translucent Area */}
      {layers.coverage && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
          <planeGeometry args={[76, 60]} />
          <meshBasicMaterial
            color={vizMode === 'coverage' ? '#059669' : '#0EA5E9'}
            transparent
            opacity={vizMode === 'coverage' ? 0.25 : 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
}

// ---------- Calibrated Flight Trajectory & Camera Poses ----------

function TrajectoryAndCameraPoses() {
  const { layers, timelineProgress } = useGeospatialStore();

  const waypoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let pass = 0; pass < 5; pass++) {
      const z = -22 + pass * 9;
      const dir = pass % 2 === 0 ? 1 : -1;
      pts.push(new THREE.Vector3(dir * -28, 16, z));
      pts.push(new THREE.Vector3(dir * 28, 16, z));
    }
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  }, []);

  const lineGeo = useMemo(() => {
    const pts = waypoints.getPoints(200);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [waypoints]);

  // Current UAV position derived from timeline %
  const uavPos = waypoints.getPointAt(timelineProgress / 100);
  const tangent = waypoints.getTangentAt(timelineProgress / 100);
  const headingAngle = Math.atan2(tangent.x, tangent.z);

  return (
    <>
      {/* Flight Trajectory Line */}
      {layers.trajectory && (
        <primitive
          object={new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({ color: '#0EA5E9', linewidth: 2, transparent: true, opacity: 0.75 })
          )}
        />
      )}

      {/* Camera Poses */}
      {layers.cameraPoses &&
        Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const pos = waypoints.getPointAt(t);
          return (
            <group key={i} position={[pos.x, pos.y, pos.z]}>
              <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                <coneGeometry args={[0.35, 0.6, 4]} />
                <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.5} />
              </mesh>
            </group>
          );
        })}

      {/* Active UAV Platform Marker */}
      <group position={[uavPos.x, 16, uavPos.z]} rotation={[0, headingAngle, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.28, 1.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.25, 0.1]}>
          <cylinderGeometry args={[0.28, 0.32, 0.22, 12]} />
          <meshStandardMaterial color="#0EA5E9" />
        </mesh>
        {/* Spotlight Downward Sensor Beam */}
        <spotLight position={[0, -0.3, 0]} target-position={[0, -16, 0]} angle={0.4} penumbra={0.5} intensity={3.0} color="#0EA5E9" distance={28} />
      </group>
    </>
  );
}

// ---------- Georeferenced Features & Selection -----------------

function FeatureMarkers() {
  const { setSelectedFeature, selectedFeature, addMeasurementPoint, measurementMode } = useGeospatialStore();

  const handlePointerDown = (e: any, featId: string) => {
    e.stopPropagation();
    if (measurementMode !== 'none') {
      // Map measurement click conversion
      const pt: GeoPoint = {
        latitude: 23.8765 + (-e.point.z / 7000),
        longitude: 70.4321 + (e.point.x / 7000),
        elevationM: e.point.y * 2.5,
      };
      addMeasurementPoint(pt);
      return;
    }

    const feat = MOCK_GEO_FEATURES.find((f) => f.id === featId) || null;
    setSelectedFeature(feat);
  };

  return (
    <>
      {MOCK_GEO_FEATURES.map((feat) => {
        const [x, y, z] = geoToViewportPos(feat.latitude, feat.longitude, feat.elevationM);
        const isSelected = selectedFeature?.id === feat.id;

        return (
          <group key={feat.id} position={[x, y + 2, z]}>
            <mesh onPointerDown={(e) => handlePointerDown(e, feat.id)}>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#0EA5E9' : '#10B981'}
                emissive={isSelected ? '#0EA5E9' : '#10B981'}
                emissiveIntensity={isSelected ? 0.6 : 0.2}
              />
            </mesh>
            <Text position={[0, 1.2, 0]} fontSize={0.9} color="#10B981" anchorX="center" anchorY="bottom">
              {feat.name.split(' ')[0]}
            </Text>
          </group>
        );
      })}
    </>
  );
}

// ---------- Measurement Visual Overlays on Map -----------------

function MapMeasurementOverlays() {
  const { activePoints, measurements, addMeasurementPoint, measurementMode } = useGeospatialStore();

  const handleGroundClick = (e: any) => {
    if (measurementMode === 'none') return;
    e.stopPropagation();
    const pt: GeoPoint = {
      latitude: 23.8765 + (-e.point.z / 7000),
      longitude: 70.4321 + (e.point.x / 7000),
      elevationM: e.point.y * 2.5,
    };
    addMeasurementPoint(pt);
  };

  return (
    <group onPointerDown={handleGroundClick}>
      {activePoints.map((pt, i) => {
        const [x, y, z] = geoToViewportPos(pt.latitude, pt.longitude, pt.elevationM);
        return (
          <group key={i} position={[x, y + 1, z]}>
            <mesh>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshBasicMaterial color="#38BDF8" />
            </mesh>
          </group>
        );
      })}

      {measurements.map((m) => {
        if (m.points.length < 1) return null;
        const ptsVec = m.points.map((p) => {
          const [x, y, z] = geoToViewportPos(p.latitude, p.longitude, p.elevationM);
          return new THREE.Vector3(x, y + 1, z);
        });

        const lineGeo = new THREE.BufferGeometry().setFromPoints(
          m.type === 'area' ? [...ptsVec, ptsVec[0]] : ptsVec
        );

        const midX = ptsVec.reduce((acc, p) => acc + p.x, 0) / ptsVec.length;
        const midY = ptsVec.reduce((acc, p) => acc + p.y, 0) / ptsVec.length;
        const midZ = ptsVec.reduce((acc, p) => acc + p.z, 0) / ptsVec.length;

        return (
          <group key={m.id}>
            <primitive object={new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: '#10B981', linewidth: 3 }))} />
            <Text position={[midX, midY + 1.5, midZ]} fontSize={0.9} color="#10B981" anchorX="center">
              {m.formattedValue}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

// ---------- Camera Reset & Mouse Hover Coordinate Reader ---------

function MapInteractionHandler({ resetTrigger }: { resetTrigger: number }) {
  const { camera } = useThree();
  const { setCursorCoordinate } = useGeospatialStore();

  useEffect(() => {
    if (resetTrigger === 0) return;
    camera.position.set(45, 35, 45);
    camera.lookAt(0, 0, 0);
  }, [resetTrigger, camera]);

  // Pointer move handler to read Lat/Lon cursor coordinates
  const handlePointerMove = (e: any) => {
    if (e.point) {
      setCursorCoordinate({
        lat: 23.8765 + (-e.point.z / 7000),
        lon: 70.4321 + (e.point.x / 7000),
        elev: e.point.y * 2.5 + 12.0,
      });
    }
  };

  return (
    <mesh
      visible={false}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial />
    </mesh>
  );
}

// ---------- Main Scene Container -------------------------------

function MapScene({ resetTrigger }: { resetTrigger: number }) {
  return (
    <>
      <MapInteractionHandler resetTrigger={resetTrigger} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[35, 45, 25]} intensity={1.5} castShadow />
      <hemisphereLight args={['#1E293B', '#07090E', 0.5]} />

      <fog attach="fog" args={['#0C1018', 70, 140]} />
      <color attach="background" args={['#0C1018']} />

      {/* Terrain Surface */}
      <GeographicTerrain />

      {/* Survey Boundary & Coverage */}
      <SurveyBoundaryOverlay />

      {/* Flight Trajectory & Camera Poses */}
      <TrajectoryAndCameraPoses />

      {/* Georeferenced Features */}
      <FeatureMarkers />

      {/* Interactive Map Measurement Visual Overlays */}
      <MapMeasurementOverlays />

      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#DC2626', '#059669', '#0EA5E9']} labelColor="white" />
      </GizmoHelper>

      <OrbitControls enableDamping dampingFactor={0.06} minDistance={5} maxDistance={140} maxPolarAngle={Math.PI / 2.05} />
    </>
  );
}

// ---------- Main Viewport Wrapper ------------------------------

export function GeospatialMapViewport() {
  const [resetTrigger, setResetTrigger] = useState(0);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', background: '#0C1018' }}
      role="region"
      aria-label="Interactive Geographic Map Viewport"
    >
      <Canvas
        shadows
        camera={{ position: [45, 35, 45], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <MapScene resetTrigger={resetTrigger} />
      </Canvas>

      {/* Reset Camera Button */}
      <button
        onClick={() => setResetTrigger((n) => n + 1)}
        title="Reset map view angle"
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
        Reset Map View
      </button>

      {/* Watermark */}
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
        RANN OF KUTCH GIS VIEWER · WGS 84 / UTM 43N
      </div>
    </div>
  );
}
