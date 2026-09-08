// ============================================================
// AERIS — Landing Page Data Types
// ============================================================

export type ViewportModeOption = 'REALISTIC' | 'POINT CLOUD' | 'WIREFRAME' | 'DEPTH MAP' | 'CLASSIFIED';

export interface PipelineStageDef {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export interface OutputItemDef {
  id: string;
  title: string;
  badge: string;
  format: string;
  description: string;
  spec: string;
}

export interface ApplicationItemDef {
  id: string;
  category: string;
  title: string;
  description: string;
  metrics: string;
}
