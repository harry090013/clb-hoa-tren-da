export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'published' | 'archived';
  projectStatus: 'upcoming' | 'fundraising' | 'active' | 'completed' | 'paused';
  targetAmount?: number;
  receivedAmount?: number;
  spentAmount?: number;
  beneficiaryCount?: number;
  featured: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorName: string;
  storyType: string;
  projectId?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  role: string;
  department: string;
  bio: string;
  avatarUrl: string;
  displayOrder: number;
  active: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  description?: string;
  partnerType: string;
  displayOrder: number;
  active: boolean;
}

export interface ImpactStat {
  id: string;
  key: string;
  label: string;
  value: number;
  suffix?: string;
  displayOrder: number;
}

export interface FinancialReport {
  id: string;
  projectId?: string;
  projectTitle?: string;
  title: string;
  reportYear: number;
  totalReceived: number;
  totalSpent: number;
  remainingBalance: number;
  publicNote?: string;
  transactions: FinancialTransaction[];
}

export interface FinancialTransaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  receiptUrl?: string;
}
