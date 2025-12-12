export interface UserProfile {
  id: string;
  name: string;
  age: number;
  experienceYears: number;
  skills: string[]; // Human skills (Wisdom, Judgment)
  digitalLiteracyScore: number; // 0-100
  agentSynergyScore: number; // 0-100
}

export interface Job {
  id: string;
  title: string;
  type: 'Remote' | 'PartTime' | 'Consultant';
  company: string;
  baseSalary: string;
  equity: string; // Stock options/Dividends
  agentDependency: number; // 0-100%
  description: string;
  tags: string[];
}

export enum TaskType {
  HUMAN = 'HUMAN',
  AGENT = 'AGENT'
}

export interface WorkTask {
  id: string;
  content: string;
  type: TaskType;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp: string;
}

export interface Course {
  id: string;
  title: string;
  duration: string;
  progress: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}