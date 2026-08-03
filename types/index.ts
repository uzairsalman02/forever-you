export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}
