export interface Situation {
  id: string;
  emoji: string;
  illustration?: string;
  title: string;
  myth: string;
  mythSource?: string;
  science: string;
  scienceSource: string;
}

export interface AgeGroup {
  id: string;
  label: string;
  labelEn: string;
  ageRange: string;
  situations: Situation[];
}

export type TileCategory = 'guide' | 'safety' | 'first-aid' | 'behavior' | 'nutrition';

export interface NavigatorTileData {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  thumbnail?: string;
  infographic: string;
  source: string;
  category: TileCategory;
}

export interface NavigatorTabData {
  id: string;
  label: string;
  ageRange: string;
  tiles: NavigatorTileData[];
}
