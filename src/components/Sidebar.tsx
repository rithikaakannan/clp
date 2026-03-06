import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  Bell, 
  User as UserIcon, 
  LogOut,
  GraduationCap
} from 'lucide-react';
import { User } from '../types';
import { cn } from './UI';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <aside className="w-[21rem] bg-[#f0f2f6] flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <GraduationCap size={32} className="text-[#31333f]" />
          <span className="font-bold text-2xl text-[#31333f]">CLMS Portal</span>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all",
                  isActive 
                    ? "bg-white text-[#ff4b4b] shadow-sm font-semibold" 
                    : "text-[#31333f] hover:bg-white/50"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">User Session</p>
          <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
            <p className="text-sm font-bold text-[#31333f]">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-all font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
