'use client'
import React, { useState } from 'react';
import { Calendar, Users, Clock, GraduationCap, Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ClassSchedule from './_components/ClassSchedule';
import StudentRegistration from './_components/StudentRegistration';
import StudentList from './_components/StudentList';
import TeacherRegistration from './_components/TeacherRegistration';
import TeacherList from './_components/TeacherList';
import NewsRegistration from './_components/NewsRegistration';
import NewsOverview from './_components/NewsOverview';
import CalendarView from './_components/CalendarView';
import ClassManagement from './_components/ClassManagement';
import Configuration from './_components/Configuration';
import Employees from './_components/Employees';
import { classData } from '@/mock/data';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'classes' | 'registration' | 'students' | 'students-list' | 'teacher-registration' | 'teachers' | 'news' | 'news-overview' | 'calendar' | 'class-management' | 'settings' | 'employees'>('classes');


  const handleViewChange = (view: 'classes' | 'registration' | 'students' | 'teacher-registration' | 'teachers' | 'news' | 'news-overview' | 'calendar' | 'class-management' | 'settings' | 'employees') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onViewChange={handleViewChange}
        currentView={currentView}
      />

      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">Brightwood Academy</h1>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="hidden sm:flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>24 Teachers</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Fall 2024</span>
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {currentView === 'classes' && (
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Class Schedules</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Current Time: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {classData.map((classInfo) => (
                  <ClassSchedule key={classInfo.id} {...classInfo} />
                ))}
              </div>
            </div>
          )}
          {currentView === 'registration' && <StudentRegistration />}
          {currentView === 'students' && <StudentList />}
          {currentView === 'teacher-registration' && <TeacherRegistration />}
          {currentView === 'teachers' && <TeacherList />}
          {currentView === 'news' && <NewsRegistration />}
          {currentView === 'news-overview' && <NewsOverview />}
          {currentView === 'calendar' && <CalendarView />}
          {currentView === 'class-management' && <ClassManagement />}
          {currentView === 'settings' && <Configuration />}
          {currentView === 'employees' && <Employees />}
        </main>
      </div>
    </div>
  );
}

export default App;