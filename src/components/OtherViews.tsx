import React from 'react';
import { Card, Badge, Button } from './UI';
import { User, Announcement } from '../types';
import { MOCK_ANNOUNCEMENTS } from '../constants';
import { Bell, User as UserIcon, Mail, Building, GraduationCap, MapPin, Phone, Shield } from 'lucide-react';

export function Announcements() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Announcements</h2>
        <p className="text-slate-500">Stay updated with the latest campus news</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_ANNOUNCEMENTS.map((ann) => (
          <Card key={ann.id} className="relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{ann.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{ann.author}</span>
                  <span className="text-slate-200">•</span>
                  <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
                </div>
              </div>
              <Badge variant="info">NEW</Badge>
            </div>
            <p className="text-slate-600 leading-relaxed">{ann.content}</p>
            <div className="mt-6 pt-6 border-t border-slate-50 flex justify-end">
              <Button variant="ghost" className="text-sm">Read Full Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function Profile({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
        <p className="text-slate-500">Manage your personal information and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
              <UserIcon size={16} />
            </button>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
          <p className="text-slate-500 font-medium">{user.id}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-wider">
            {user.role}
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Mail size={18} className="text-slate-400" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Building size={18} className="text-slate-400" />
              <span className="text-sm">{user.department}</span>
            </div>
            {user.course && (
              <div className="flex items-center gap-3 text-slate-600">
                <GraduationCap size={18} className="text-slate-400" />
                <span className="text-sm">{user.course}</span>
              </div>
            )}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Personal Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={16} className="text-slate-300" />
                  <span className="font-medium">+1 (555) 000-1234</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Address</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin size={16} className="text-slate-300" />
                  <span className="font-medium">123 University Ave, Campus Town</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Emergency Contact</p>
                <div className="flex items-center gap-2 text-slate-700">
                  <Shield size={16} className="text-slate-300" />
                  <span className="font-medium">Jane Doe (+1 555-999-8888)</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="secondary">Edit Personal Information</Button>
            </div>
          </Card>

          <Card title="Account Settings">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Email Notifications</p>
                  <p className="text-xs text-slate-500">Receive updates about assignments and exams</p>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
