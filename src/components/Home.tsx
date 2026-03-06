import React from 'react';
import { Card, Button } from './UI';
import { User } from '../types';
import { GraduationCap, BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home({ user, setActiveTab }: { user: User; setActiveTab: (tab: string) => void }) {
  const features = [
    { title: 'Academic Dashboard', desc: 'View your progress and statistics', icon: BookOpen, tab: 'dashboard', color: 'bg-blue-500' },
    { title: 'Attendance Tracker', desc: 'Monitor your daily presence', icon: Calendar, tab: 'attendance', color: 'bg-emerald-500' },
    { title: 'Assignments', desc: 'Manage your coursework and deadlines', icon: GraduationCap, tab: 'assignments', color: 'bg-purple-500' },
    { title: 'Campus Community', desc: 'Connect with peers and faculty', icon: Users, tab: 'profile', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-12 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-600 p-8 md:p-12 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Welcome back, <br />
            <span className="text-indigo-200">{user.name}</span>
          </motion.h1>
          <p className="mt-6 text-lg text-indigo-100 leading-relaxed">
            Your centralized academic hub is ready. Check your latest assignments, 
            track your attendance, and stay updated with campus announcements.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button 
              onClick={() => setActiveTab('dashboard')}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3 text-lg"
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab('announcements')}
              className="text-white hover:bg-white/10 px-8 py-3 text-lg border border-white/20"
            >
              View Announcements
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button 
              onClick={() => setActiveTab(feature.tab)}
              className="w-full text-left group"
            >
              <Card className="h-full p-6 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50 transition-all">
                <div className={`w-12 h-12 rounded-2xl ${feature.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{feature.desc}</p>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Academic Calendar" className="p-0">
          <div className="p-6 space-y-4">
            {[
              { date: 'Mar 15', event: 'Mid-term Project Submission', type: 'Academic' },
              { date: 'Mar 22', event: 'Spring Workshop Series', type: 'Event' },
              { date: 'Apr 05', event: 'Final Exam Registration', type: 'Admin' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="text-center min-w-[60px]">
                  <p className="text-xs font-bold text-indigo-600 uppercase">{item.date.split(' ')[0]}</p>
                  <p className="text-xl font-bold text-slate-800">{item.date.split(' ')[1]}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{item.event}</p>
                  <p className="text-xs text-slate-400">{item.type}</p>
                </div>
                <ArrowRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Resources">
          <div className="grid grid-cols-2 gap-4">
            {['Library Portal', 'Fee Payment', 'Exam Results', 'Course Catalog', 'IT Support', 'Campus Map'].map((res) => (
              <button key={res} className="p-3 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-left">
                {res}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
