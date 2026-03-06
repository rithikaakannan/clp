import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card } from './UI';
import { MOCK_ATTENDANCE_STATS, MOCK_PERFORMANCE_DATA } from '../constants';
import { Users, FileCheck, MessageSquare, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function FacultyDashboard() {
  const stats = [
    { label: 'Total Students', value: '124', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Submissions', value: '45/124', icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Queries', value: '12', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Avg. Score', value: '84%', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Attendance Overview">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ATTENDANCE_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} name="Present" />
                <Bar dataKey="absent" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Student Performance Distribution">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_PERFORMANCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="score"
                  nameKey="subject"
                >
                  {MOCK_PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Mark Attendance', 'Upload Assignment', 'Post Announcement', 'Grade Submissions'].map((action) => (
            <button
              key={action}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left group"
            >
              <p className="font-semibold text-slate-800 group-hover:text-indigo-600">{action}</p>
              <p className="text-xs text-slate-500 mt-1">Manage your class efficiently</p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
