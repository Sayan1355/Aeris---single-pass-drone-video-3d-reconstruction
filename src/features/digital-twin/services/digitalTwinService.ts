// ============================================================
// AERIS — 3D Digital Twin Service
// Adapter interface for backend REST / 3D Tiles / OGC integration
// Replaceable implementation layer
// ============================================================

import type { FeatureMetadata } from '../types';
import { MOCK_TWIN_FEATURES } from '../data';

export interface IDigitalTwinService {
  getFeatures(): Promise<FeatureMetadata[]>;
  getFeatureById(id: string): Promise<FeatureMetadata | null>;
  queryElevationAtCoordinate(lat: number, lon: number): Promise<number>;
}

export class MockDigitalTwinService implements IDigitalTwinService {
  async getFeatures(): Promise<FeatureMetadata[]> {
    // Simulated network latency
    return Promise.resolve(MOCK_TWIN_FEATURES);
  }

  async getFeatureById(id: string): Promise<FeatureMetadata | null> {
    const feat = MOCK_TWIN_FEATURES.find((f) => f.id === id) || null;
    return Promise.resolve(feat);
  }

  async queryElevationAtCoordinate(lat: number, lon: number): Promise<number> {
    // Simulated DEM elevation calculation
    const elev = 5.0 + Math.sin(lat * 100) * 4.0 + Math.cos(lon * 100) * 3.0;
    return Promise.resolve(elev);
  }
}

export const digitalTwinService = new MockDigitalTwinService();
