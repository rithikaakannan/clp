import React, { useState } from 'react';
import { Card, Button, Badge } from './UI';
import { User, AttendanceRecord } from '../types';
import { Calendar, Check, X, Search } from 'lucide-react';

interface AttendanceProps {
  user: User;
}

export default function Attendance({ user }: AttendanceProps) {
  const isFaculty = user.role === 'faculty';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock student list for faculty
  const students = [
    { id: 'S101', name: 'Alex Johnson', status: 'present' },
    { id: 'S102', name: 'Maria Garcia', status: 'absent' },
    { id: 'S103', name: 'James Wilson', status: 'present' },
    { id: 'S104', name: 'Emma Brown', status: 'present' },
  ];

  // Mock records for student
  const studentRecords: AttendanceRecord[] = [
    { date: '2024-03-10', status: 'present', course: 'CS201' },
    { date: '2024-03-11', status: 'present', course: 'CS201' },
    { date: '2024-03-12', status: 'absent', course: 'CS201' },
    { date: '2024-03-13', status: 'present', course: 'CS201' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Attendance Management</h2>
          <p className="text-slate-500">Track and manage daily attendance records</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <Calendar size={18} className="text-slate-400 ml-2" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-none outline-none text-sm font-medium text-slate-700 bg-transparent"
          />
        </div>
      </div>

      {isFaculty ? (
        <Card title={`Mark Attendance - ${selectedDate}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100">
                  <th className="pb-4 font-semibold text-slate-600 text-sm">Student Name</th>
                  <th className="pb-4 font-semibold text-slate-600 text-sm">ID</th>
                  <th className="pb-4 font-semibold text-slate-600 text-sm text-center">Status</th>
                  <th className="pb-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((student) => (
                  <tr key={student.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-medium text-slate-800">{student.name}</td>
                    <td className="py-4 text-slate-500 text-sm">{student.id}</td>
                    <td className="py-4 text-center">
                      <Badge variant={student.status === 'present' ? 'success' : 'error'}>
                        {student.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                          <Check size={16} />
                        </button>
                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <Button>Save Attendance</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2" title="My Attendance History">
            <div className="space-y-4">
              {studentRecords.map((record, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      record.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {record.status === 'present' ? <Check size={20} /> : <X size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{record.course}</p>
                      <p className="text-xs text-slate-500">{record.date}</p>
                    </div>
                  </div>
                  <Badge variant={record.status === 'present' ? 'success' : 'error'}>
                    {record.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Attendance Summary">
            <div className="text-center py-6">
              <div className="relative inline-flex items-center justify-center mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-slate-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * 88) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-slate-800">88%</span>
              </div>
              <p className="text-sm text-slate-500">Overall Attendance</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 font-bold uppercase">Present</p>
                  <p className="text-lg font-bold text-emerald-700">42</p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-xs text-red-600 font-bold uppercase">Absent</p>
                  <p className="text-lg font-bold text-red-700">6</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
