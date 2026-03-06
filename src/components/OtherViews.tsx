import React, { useState } from 'react';
import { Card, Badge, Button, StWidget } from './UI';
import { User, Announcement } from '../types';
import { MOCK_ANNOUNCEMENTS } from '../constants';
import { User as UserIcon, Mail, Building, GraduationCap, MapPin, Phone, Shield } from 'lucide-react';

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
  const [showPython, setShowPython] = useState(false);

  const pythonCode = `
import streamlit as st
import pandas as pd
import plotly.express as px

# 1. Login System
def login():
    st.sidebar.title("Login")
    role = st.sidebar.radio("Select Role", ["Student", "Faculty"])
    user_id = st.sidebar.text_input("User ID")
    password = st.sidebar.text_input("Password", type="password")
    
    if st.sidebar.button("Login"):
        if password == "password":
            st.session_state['user'] = {"id": user_id, "role": role}
            st.success(f"Logged in as {role}")
        else:
            st.error("Invalid credentials")

# 2. Dashboard
def dashboard():
    st.title(f"{st.session_state['user']['role']} Dashboard")
    
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Attendance", "88%", "+2%")
    col2.metric("Assignments", "3", "-1")
    col3.metric("GPA", "3.8")
    col4.metric("Credits", "18/22")

    st.subheader("Course Progress")
    df = pd.DataFrame({
        "Course": ["Data Structures", "Algorithms", "Databases"],
        "Progress": [75, 60, 90]
    })
    fig = px.bar(df, x="Progress", y="Course", orientation='h')
    st.plotly_chart(fig)

if 'user' not in st.session_state:
    login()
else:
    dashboard()
  `;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-[#31333f]">Profile & Settings</h2>
        <p className="text-slate-500">Manage your account and view source code.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 text-center">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-xl">
              {user.name.charAt(0)}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#31333f]">{user.name}</h3>
          <p className="text-slate-500 font-medium">{user.id}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-wider">
            {user.role}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card title="Account Information">
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Department</span>
                <span className="font-medium">{user.department}</span>
              </div>
            </div>
          </Card>

          <StWidget label="Developer Resources">
            <Button 
              variant="secondary" 
              onClick={() => setShowPython(!showPython)}
              className="w-full flex items-center justify-center gap-2"
            >
              {showPython ? 'Hide Python Code' : 'View Equivalent Streamlit Code'}
            </Button>
            
            {showPython && (
              <div className="mt-4 p-4 bg-slate-900 rounded-lg overflow-x-auto">
                <pre className="text-xs text-emerald-400 font-mono">
                  {pythonCode}
                </pre>
              </div>
            )}
          </StWidget>
        </div>
      </div>
    </div>
  );
}
