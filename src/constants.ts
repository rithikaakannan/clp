import { User, Assignment, Announcement, CourseProgress } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'S101',
    name: 'Alex Johnson',
    role: 'student',
    email: 'alex.j@university.edu',
    department: 'Computer Science',
    course: 'B.Tech CS',
  },
  {
    id: 'F201',
    name: 'Dr. Sarah Smith',
    role: 'faculty',
    email: 's.smith@university.edu',
    department: 'Computer Science',
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'A1',
    title: 'Data Structures Project',
    course: 'CS201',
    dueDate: '2024-03-20',
    status: 'pending',
    description: 'Implement a balanced BST and analyze its performance.',
  },
  {
    id: 'A2',
    title: 'Database Normalization',
    course: 'CS302',
    dueDate: '2024-03-25',
    status: 'submitted',
    description: 'Normalize the given schema to 3NF and BCNF.',
  },
  {
    id: 'A3',
    title: 'Operating Systems Quiz',
    course: 'CS401',
    dueDate: '2024-03-18',
    status: 'pending',
    description: 'Covers process scheduling and memory management.',
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'N1',
    title: 'Mid-Semester Exams Schedule',
    content: 'The mid-semester exams will commence from April 1st. Check the portal for details.',
    date: '2024-03-10',
    author: 'Academic Office',
  },
  {
    id: 'N2',
    title: 'Guest Lecture: AI in Healthcare',
    content: 'Join us for an insightful session by Dr. Miller this Friday at 10 AM.',
    date: '2024-03-12',
    author: 'CS Department',
  },
];

export const MOCK_COURSE_PROGRESS: CourseProgress[] = [
  { name: 'Data Structures', progress: 75, color: '#6366f1' },
  { name: 'Algorithms', progress: 60, color: '#ec4899' },
  { name: 'Databases', progress: 90, color: '#10b981' },
  { name: 'Web Dev', progress: 45, color: '#f59e0b' },
];

export const MOCK_ATTENDANCE_STATS = [
  { name: 'Mon', present: 45, absent: 5 },
  { name: 'Tue', present: 48, absent: 2 },
  { name: 'Wed', present: 42, absent: 8 },
  { name: 'Thu', present: 50, absent: 0 },
  { name: 'Fri', present: 46, absent: 4 },
];

export const MOCK_PERFORMANCE_DATA = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 72 },
  { subject: 'History', score: 90 },
  { subject: 'CS', score: 95 },
  { subject: 'English', score: 88 },
];
