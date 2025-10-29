// User roles and types
export type UserRole = 'student' | 'faculty' | 'hod' | 'dean' | 'accountant' | 'registrar' | 'director';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

// Common status types
export type StatusType = 'paid' | 'pending' | 'overdue' | 'approved' | 'rejected' | 'verified' | 'draft';

// Theme types
export type Theme = 'light' | 'dark' | 'system';
