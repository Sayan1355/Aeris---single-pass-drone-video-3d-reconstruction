// ============================================================
// AERIS — Phase 6 Products / Export Center Data Types
// ============================================================

export type ProductCategory = 
  | '3d_mesh'
  | 'point_cloud'
  | 'raster'
  | 'vector'
  | 'report';

export type ProductStatus = 'READY' | 'PROCESSING' | 'ARCHIVED';

export type ViewModeOption = 'realistic' | 'pointcloud' | 'wireframe' | 'elevation';

export interface QualityIndicators {
  geometry: 'VALID' | 'WARNING' | 'FAILED';
  texture: 'VALID' | 'WARNING' | 'FAILED';
  georeference: 'VALID' | 'WARNING' | 'FAILED';
  metadata: 'VALID' | 'WARNING' | 'FAILED';
  export: 'READY' | 'PENDING';
}

export interface BoundingBox3D {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  minAlt: number;
  maxAlt: number;
}

export interface ProductAsset {
  id: string;
  name: string;
  shortCode: string;
  category: ProductCategory;
  format: string;
  availableFormats: string[];
  status: ProductStatus;
  size: string;
  sizeBytes: number;
  version: string;
  generatedAt: string;
  crs: string;
  gsd?: string;
  resolution?: string;
  pointCount?: string;
  polygonCount?: string;
  confidence?: string;
  classificationClasses?: string[];
  boundingBox?: BoundingBox3D;
  density?: string;
  checksum?: string;
  thumbnailUrl?: string;
  description: string;
  isFeatured?: boolean;
  quality: QualityIndicators;
}

export interface ProductMetrics {
  totalProducts: number;
  assets3d: number;
  rasterProducts: number;
  pointCloudPoints: string;
  totalOutputSize: string;
  coordinateSystem: string;
  gsd: string;
}

export interface ExportConfig {
  assetId: string;
  format: string;
  version: string;
  resolution: string;
  coordinateSystem: string;
  compression: 'none' | 'deflate' | 'lzw' | 'draco';
  includeMetadata: boolean;
}
