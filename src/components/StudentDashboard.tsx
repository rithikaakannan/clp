import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, Badge } from './UI';
import { MOCK_COURSE_PROGRESS, MOCK_ASSIGNMENTS, MOCK_ANNOUNCEMENTS } from '../constants';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function StudentDashboard() {
  const stats = [
    { label: 'Attendance', value: '88%', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Assignments', value: '3 Pending', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'GPA', value: '3.8', icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Credits', value: '18/22', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Course Progress" className="lg:col-span-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_COURSE_PROGRESS} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={20}>
                  {MOCK_COURSE_PROGRESS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Upcoming Deadlines">
          <div className="space-y-4">
            {MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').map((assignment) => (
              <div key={assignment.id} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{assignment.title}</h4>
                  <Badge variant="warning">{assignment.dueDate}</Badge>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{assignment.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Announcements">
          <div className="space-y-6">
            {MOCK_ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="flex gap-4">
                <div className="w-1 h-12 bg-indigo-500 rounded-full" />
                <div>
                  <h4 className="font-semibold text-slate-800">{ann.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{ann.content}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{ann.author}</span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{ann.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Attendance Trend">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: 'Jan', rate: 85 },
                { name: 'Feb', rate: 92 },
                { name: 'Mar', rate: 88 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
