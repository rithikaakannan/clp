import streamlit as st
import pandas as pd
import plotly.express as px
from datetime import datetime

# --- CONFIGURATION ---
st.set_page_config(page_title="CLMS Portal", page_icon="🎓", layout="wide")

# --- MOCK DATA ---
if 'users' not in st.session_state:
    st.session_state.users = {
        "S101": {"name": "Alex Johnson", "role": "Student", "dept": "Computer Science", "email": "alex@uni.edu"},
        "F201": {"name": "Dr. Sarah Smith", "role": "Faculty", "dept": "Data Science", "email": "sarah@uni.edu"}
    }

# --- AUTHENTICATION ---
def login():
    st.markdown("<h1 style='text-align: center;'>🎓 CLMS Portal</h1>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center;'>Centralized Learning Management System</p>", unsafe_allow_html=True)
    
    with st.container():
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            st.subheader("Login")
            user_id = st.text_input("User ID (S101 or F201)")
            password = st.text_input("Password", type="password")
            if st.button("Sign In", use_container_width=True):
                if user_id in st.session_state.users and password == "password":
                    st.session_state.authenticated = True
                    st.session_state.user = st.session_state.users[user_id]
                    st.rerun()
                else:
                    st.error("Invalid credentials. Use S101/password or F201/password")

# --- DASHBOARD VIEWS ---
def student_dashboard():
    st.title("Student Dashboard")
    
    # Metrics
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Attendance", "88%", "+2%")
    m2.metric("Pending Tasks", "3", "-1")
    m3.metric("Current GPA", "3.8")
    m4.metric("Credits", "18/22")

    # Charts
    c1, c2 = st.columns([2, 1])
    with c1:
        st.subheader("Course Progress")
        df = pd.DataFrame({
            "Course": ["Data Structures", "Algorithms", "Databases", "Web Dev"],
            "Progress": [75, 45, 90, 60]
        })
        fig = px.bar(df, x="Progress", y="Course", orientation='h', color="Progress", color_continuous_scale="Viridis")
        st.plotly_chart(fig, use_container_width=True)
    
    with c2:
        st.subheader("Deadlines")
        st.info("**Assignment 3** - Mar 15")
        st.warning("**Quiz 2** - Mar 18")
        st.error("**Project Alpha** - Mar 22")

def faculty_dashboard():
    st.title("Faculty Dashboard")
    
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Total Students", "124")
    m2.metric("Submissions", "45/124", "36%")
    m3.metric("Active Queries", "12", "+3")
    m4.metric("Avg. Score", "84%")

    st.subheader("Performance Distribution")
    df = pd.DataFrame({
        "Subject": ["Math", "Physics", "CS", "Eng"],
        "Score": [82, 78, 91, 85]
    })
    fig = px.pie(df, values="Score", names="Subject", hole=0.4)
    st.plotly_chart(fig, use_container_width=True)

# --- MAIN APP LOGIC ---
if 'authenticated' not in st.session_state:
    login()
else:
    user = st.session_state.user
    
    # Sidebar Navigation
    st.sidebar.title("CLMS Portal")
    st.sidebar.markdown(f"**User:** {user['name']}")
    st.sidebar.markdown(f"**Role:** {user['role']}")
    
    menu = st.sidebar.radio("Navigation", ["Home", "Dashboard", "Attendance", "Assignments", "Profile"])
    
    if st.sidebar.button("Logout"):
        del st.session_state.authenticated
        st.rerun()

    if menu == "Home":
        st.title(f"Welcome, {user['name']}!")
        st.write("Your centralized academic hub is ready.")
        st.image("https://picsum.photos/seed/education/800/400")
        
    elif menu == "Dashboard":
        if user['role'] == "Student":
            student_dashboard()
        else:
            faculty_dashboard()
            
    elif menu == "Attendance":
        st.title("Attendance Management")
        date = st.date_input("Select Date", datetime.now())
        st.table(pd.DataFrame({
            "Student ID": ["S101", "S102", "S103"],
            "Name": ["Alex", "Maria", "James"],
            "Status": ["Present", "Absent", "Present"]
        }))
        
    elif menu == "Assignments":
        st.title("Assignments")
        if user['role'] == "Faculty":
            st.button("Create New Assignment")
        st.write("1. Data Structures - Linked Lists (Due: Mar 15)")
        st.write("2. Database Systems - SQL Joins (Due: Mar 20)")

    elif menu == "Profile":
        st.title("My Profile")
        st.json(user)
