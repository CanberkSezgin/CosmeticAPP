export type Undertone = 'cool' | 'warm' | 'neutral';
export type FaceShape = 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'oblong' | 'triangle';
export type Language = 'en' | 'tr';

export interface ColorDetail {
  hex: string;
  name: string;
  reason: string;
  combinations: string;
}

export interface StylingDetail {
  name: string;
  reason: string;
  changes: string;
}

export interface ColorPalette {
  season: string;
  description: string;
  bestColors: ColorDetail[];
  avoidColors: ColorDetail[];
  makeup: {
    foundation: string;
    blush: string;
    eyeshadow: string;
    lipstick: string;
  };
  metals: string[];
}

export interface StylingRecommendations {
  haircuts: StylingDetail[];
  haircutAvoid: string[];
  glasses: StylingDetail[];
  glassesAvoid: string[];
  hairColors: ColorDetail[];
}

export interface AnalysisResult {
  imageUrl: string | null;
  undertone: Undertone;
  faceShape: FaceShape;
  colorPalette: ColorPalette;
  styling: StylingRecommendations;
}
