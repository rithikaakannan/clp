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
  Cell
} from 'recharts';
import { Card, StMetric, StWidget } from './UI';
import { MOCK_COURSE_PROGRESS, MOCK_ASSIGNMENTS, MOCK_ANNOUNCEMENTS } from '../constants';
import { motion } from 'motion/react';

export default function StudentDashboard() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#31333f] mb-2">Student Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's your academic overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StMetric label="Attendance" value="88%" delta="+2%" />
        <StMetric label="Pending Tasks" value="3" delta="-1" deltaColor="red" />
        <StMetric label="Current GPA" value="3.8" />
        <StMetric label="Credits" value="18/22" />
      </div>

      <StWidget label="Course Progress">
        <Card className="p-6">
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
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
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
      </StWidget>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StWidget label="Upcoming Assignments">
          <div className="space-y-3">
            {MOCK_ASSIGNMENTS.filter(a => a.status === 'pending').map((assignment) => (
              <div key={assignment.id} className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-slate-800">{assignment.title}</h4>
                  <span className="text-xs font-bold text-[#ff4b4b] bg-red-50 px-2 py-1 rounded">{assignment.dueDate}</span>
                </div>
                <p className="text-sm text-slate-500">{assignment.description}</p>
              </div>
            ))}
          </div>
        </StWidget>

        <StWidget label="Attendance Trend">
          <Card className="p-6">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Jan', rate: 85 },
                  { name: 'Feb', rate: 92 },
                  { name: 'Mar', rate: 88 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#ff4b4b" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#ff4b4b', strokeWidth: 2, stroke: '#fff' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </StWidget>
      </div>

      <StWidget label="Latest Announcements">
        <div className="space-y-4">
          {MOCK_ANNOUNCEMENTS.map((ann) => (
            <div key={ann.id} className="p-6 bg-white rounded-lg border border-slate-100 shadow-sm border-l-4 border-l-indigo-500">
              <h4 className="font-bold text-slate-800 text-lg mb-2">{ann.title}</h4>
              <p className="text-slate-600 mb-4">{ann.content}</p>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>{ann.author}</span>
                <span>•</span>
                <span>{ann.date}</span>
              </div>
            </div>
          ))}
        </div>
      </StWidget>
    </div>
  );
}
