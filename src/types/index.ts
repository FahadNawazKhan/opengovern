export type UserRole = 'citizen' | 'authority';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type ReportStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';
export type ReportCategory = 'infrastructure' | 'safety' | 'environment' | 'utilities' | 'other';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  location: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  citizenId: string;
  citizenName: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  reportId: string;
  userId: string;
  userName: string;
  action: string;
  description: string;
  timestamp: string;
}
