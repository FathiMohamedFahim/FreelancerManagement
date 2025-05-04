// Project related types
export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled';

export interface ProjectSummary {
  id: number;
  name: string;
  client: string;
  dueDate: string;
  status: ProjectStatus;
  progress: number;
}

// Client related types
export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface ClientSummary {
  id: number;
  name: string;
  company: string;
  email: string;
  status: ClientStatus;
  totalProjects: number;
  lastContact: string;
}

// Time tracking related types
export interface TimeEntrySummary {
  id: number;
  project: string;
  task: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  billable: boolean;
}

// Goals related types
export type GoalStatus = 'active' | 'completed' | 'overdue';
export type GoalCategory = 'business' | 'financial' | 'personal' | 'professional';

export interface GoalSummary {
  id: number;
  title: string;
  deadline: string;
  status: GoalStatus;
  category: GoalCategory;
  progress: number;
  totalMilestones: number;
  completedMilestones: number;
}

export interface Milestone {
  id: number;
  goalId: number;
  title: string;
  completed: boolean;
}

// Financial related types
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed';

export interface TransactionSummary {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: string;
  paymentMethod: string;
  status: TransactionStatus;
}

export type InvoiceStatus = 'paid' | 'unpaid' | 'overdue';

export interface InvoiceSummary {
  id: number;
  client: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Messaging related types
export interface MessageSummary {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Files related types
export interface FileSummary {
  id: number;
  name: string;
  type: string;
  size: number; // in bytes
  project?: string;
  uploadDate: string;
}

// Auth related types
export interface UserProfile {
  id: number;
  username: string;
  fullName?: string;
  email?: string;
  settings?: UserSettings;
}

export interface UserSettings {
  theme?: 'light' | 'dark';
  language?: 'en' | 'ar';
  notifications?: {
    email: boolean;
    push: boolean;
  };
}

// AI Assistant related types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export interface ProjectAnalysis {
  suggestedPrice: {
    min: number;
    max: number;
    currency: string;
  };
  estimatedHours: {
    min: number;
    max: number;
  };
  scope: {
    requirements: string[];
    challenges: string[];
    recommendations: string[];
  };
}

export interface RateCalculation {
  hourlyRate: {
    min: number;
    max: number;
    recommended: number;
    currency: string;
  };
  projectRate?: {
    min: number;
    max: number;
    recommended: number;
    currency: string;
  };
  factors: {
    name: string;
    impact: 'high' | 'medium' | 'low';
    description: string;
  }[];
  recommendations: string[];
}

export interface TimeEstimate {
  totalHours: {
    min: number;
    max: number;
    recommended: number;
  };
  breakdown: {
    phase: string;
    description: string;
    hours: {
      min: number;
      max: number;
    };
  }[];
  recommendations: string[];
}
