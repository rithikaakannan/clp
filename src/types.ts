export type UserRole = 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  department: string;
  course?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  description: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent';
  course: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export interface CourseProgress {
  name: string;
  progress: number;
  color: string;
}
