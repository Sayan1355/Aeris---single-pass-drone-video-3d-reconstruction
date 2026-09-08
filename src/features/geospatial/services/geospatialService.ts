// ============================================================
// AERIS — Geospatial Intelligence Service
// Replaceable service adapter for backend GIS / WMS / WFS / CZML integration
// ============================================================

import type {
  GeoFeatureMetadata,
  FlightAnalysisMetrics,
  CoverageMetrics,
  CrsInformation,
} from '../types';
import {
  MOCK_GEO_FEATURES,
  MOCK_FLIGHT_METRICS,
  MOCK_COVERAGE_METRICS,
  MOCK_CRS_INFO,
} from '../data';

export interface IGeospatialService {
  getGeoFeatures(): Promise<GeoFeatureMetadata[]>;
  getFlightMetrics(): Promise<FlightAnalysisMetrics>;
  getCoverageMetrics(): Promise<CoverageMetrics>;
  getCrsInfo(): Promise<CrsInformation>;
}

export class MockGeospatialService implements IGeospatialService {
  async getGeoFeatures(): Promise<GeoFeatureMetadata[]> {
    return Promise.resolve(MOCK_GEO_FEATURES);
  }

  async getFlightMetrics(): Promise<FlightAnalysisMetrics> {
    return Promise.resolve(MOCK_FLIGHT_METRICS);
  }

  async getCoverageMetrics(): Promise<CoverageMetrics> {
    return Promise.resolve(MOCK_COVERAGE_METRICS);
  }

  async getCrsInfo(): Promise<CrsInformation> {
    return Promise.resolve(MOCK_CRS_INFO);
  }
}

export const geospatialService = new MockGeospatialService();
