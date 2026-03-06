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
import { Card, StMetric, StWidget } from './UI';
import { MOCK_ATTENDANCE_STATS, MOCK_PERFORMANCE_DATA } from '../constants';
import { motion } from 'motion/react';

export default function FacultyDashboard() {
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#31333f] mb-2">Faculty Dashboard</h1>
        <p className="text-slate-500">Class performance and administrative overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StMetric label="Total Students" value="124" />
        <StMetric label="Submissions" value="45/124" delta="36%" />
        <StMetric label="Active Queries" value="12" delta="+3" />
        <StMetric label="Avg. Score" value="84%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StWidget label="Weekly Attendance Overview">
          <Card className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_ATTENDANCE_STATS}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="present" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={30} name="Present" />
                  <Bar dataKey="absent" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </StWidget>

        <StWidget label="Performance Distribution">
          <Card className="p-6">
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
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </StWidget>
      </div>

      <StWidget label="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Mark Attendance', 'Upload Assignment', 'Post Announcement', 'Grade Submissions'].map((action) => (
            <button
              key={action}
              className="p-4 rounded-xl border border-slate-200 hover:border-[#ff4b4b] hover:bg-red-50 transition-all text-left group"
            >
              <p className="font-bold text-slate-800 group-hover:text-[#ff4b4b]">{action}</p>
              <p className="text-xs text-slate-500 mt-1">Class management</p>
            </button>
          ))}
        </div>
      </StWidget>
    </div>
  );
}
