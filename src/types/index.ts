export type TileCategory = 'guide' | 'safety' | 'first-aid' | 'behavior' | 'nutrition' | 'vaccination' | 'development';

export interface MythScience {
  myth: string;
  mythSource?: string;
  science: string;
  scienceSource: string;
}

export interface KeyPoint {
  icon: string;
  text: string;
}

export interface AgeChartItem {
  age: string;
  text: string;
}

export interface DosDonts {
  dos: string[];
  donts: string[];
}

export interface StepItem {
  step: number;
  title: string;
  text: string;
}

export interface TileContent {
  keyPoints: KeyPoint[];
  warningTitle?: string;
  warningSigns: string[];
  doctorTip: string;
  mythScience?: MythScience;
  ageChart?: AgeChartItem[];
  dosDonts?: DosDonts;
  steps?: StepItem[];
}

export interface NavigatorTileData {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  thumbnail?: string;
  infographic: string;
  source: string;
  category: TileCategory;
  content: TileContent;
}

export interface NavigatorTabData {
  id: string;
  label: string;
  ageRange: string;
  tiles: NavigatorTileData[];
}
