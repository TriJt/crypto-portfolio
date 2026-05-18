export interface PersonalInfo {
  name: string;
  nameShort: string;
  title: string;
  bio: string[];
  avatar: string;
  emoji: string;
  location: string;
}

export interface Social {
  username: string;
  url: string;
  icon: string;
  color: string;
  label: string;
}

export interface Stat {
  key: string;
  value: number;
  display: string;
  label: string;
  icon: string;
}

export interface Skill {
  icon: string;
  name: string;
  desc: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  desc: string;
}

export type BadgeVariant = "cyan" | "violet" | "pink" | "emerald" | "amber" | "blue" | string;

export interface Project {
  id: number;
  name: string;
  emoji: string;          // URL hoặc emoji character
  projectType: string;
  typeCategory: string;
  badgeVariant: BadgeVariant;
  role: string;
  period: string;
  activities: string[];
  description: string;
  technologies: string[];
  liveUrl: string;
}

export interface Post {
  id: number;
  name: string;
  emoji: string;
  projectType: string;
  typeCategory: string;
  badgeVariant: BadgeVariant;     // ← Sửa ở đây
  role: string;
  period: string;
  url: string[];                  // mảng link X
  description?: string;
  technologies?: string[];
  liveUrl?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  socials: Record<string, Social>;
  stats: Stat[];
  skills: Skill[];
  timeline: TimelineEntry[];
  projects: Project[];
}
