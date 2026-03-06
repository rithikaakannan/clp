import React, { useState } from 'react';
import { Card, Button, Badge } from './UI';
import { User, Assignment } from '../types';
import { MOCK_ASSIGNMENTS } from '../constants';
import { FileText, Plus, Upload, Download, MoreVertical, Clock } from 'lucide-react';

interface AssignmentsProps {
  user: User;
}

export default function Assignments({ user }: AssignmentsProps) {
  const isFaculty = user.role === 'faculty';
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Assignments</h2>
          <p className="text-slate-500">Manage course assignments and submissions</p>
        </div>
        {isFaculty && (
          <Button onClick={() => setShowUpload(true)} className="flex items-center gap-2">
            <Plus size={18} /> Create Assignment
          </Button>
        )}
      </div>

      {showUpload && isFaculty && (
        <Card title="Create New Assignment" className="border-indigo-200 bg-indigo-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Assignment Title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>CS201 - Data Structures</option>
                  <option>CS302 - Databases</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input type="date" className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 h-20" placeholder="Assignment details..."></textarea>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button>Publish Assignment</Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ASSIGNMENTS.map((assignment) => (
          <Card key={assignment.id} className="group hover:border-indigo-200 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-800 text-lg">{assignment.title}</h3>
                    <Badge variant={assignment.status === 'submitted' ? 'success' : 'warning'}>
                      {assignment.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{assignment.course} • {assignment.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Clock size={14} />
                      Due: {assignment.dueDate}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isFaculty ? (
                  <>
                    <Button variant="secondary" className="flex items-center gap-2 text-sm">
                      <Download size={16} /> Submissions
                    </Button>
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                      <MoreVertical size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    {assignment.status === 'pending' ? (
                      <Button className="flex items-center gap-2">
                        <Upload size={16} /> Submit Now
                      </Button>
                    ) : (
                      <Button variant="secondary" className="flex items-center gap-2">
                        <Download size={16} /> View Submission
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
