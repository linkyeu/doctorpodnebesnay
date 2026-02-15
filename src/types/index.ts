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
