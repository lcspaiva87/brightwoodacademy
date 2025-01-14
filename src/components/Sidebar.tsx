import React from 'react';
import { Home, BookOpen, Calendar, X, UserPlus, Users, Newspaper, ListFilter, Edit3, Cog, Building2 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (view: 'classes' | 'registration' | 'students' | 'teacher-registration' | 'teachers' | 'news' | 'news-overview' | 'calendar' | 'class-management' | 'settings' | 'employees') => void;
  currentView: 'classes' | 'registration' | 'students' | 'teacher-registration' | 'teachers' | 'news' | 'news-overview' | 'calendar' | 'class-management' | 'settings' | 'employees' | 'students-list';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onViewChange, currentView }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', view: 'dashboard' },
    { icon: BookOpen, label: 'Classes', view: 'classes' },
    { icon: Edit3, label: 'Class Management', view: 'class-management' },
    { icon: UserPlus, label: 'Student Registration', view: 'registration' },
    { icon: UserPlus, label: 'Student List', view: 'students-list' },
    { icon: Users, label: 'Teachers', view: 'teachers' },
    { icon: UserPlus, label: 'Teacher Registration', view: 'teacher-registration' },
    { icon: Building2, label: 'Employees', view: 'employees' },
    { icon: Newspaper, label: 'News Registration', view: 'news' },
    { icon: ListFilter, label: 'News Overview', view: 'news-overview' },
    { icon: Calendar, label: 'Calendar', view: 'calendar' },
    { icon: Cog, label: 'Settings', view: 'settings' },

  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex items-center justify-end p-4 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.view === 'classes' || item.view === 'registration' || item.view === 'students' ||
                    item.view === 'teacher-registration' || item.view === 'teachers' || item.view === 'news' ||
                    item.view === 'news-overview' || item.view === 'calendar' || item.view === 'class-management' ||
                    item.view === 'settings' || item.view === 'employees') {
                    onViewChange(item.view);
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${currentView === item.view
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`h-5 w-5 ${currentView === item.view ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </a>
            ))}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=32&q=80"
                alt="Admin user"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;