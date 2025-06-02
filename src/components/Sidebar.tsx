import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, BookOpen, GraduationCap, Calendar, MessageSquare, Users, BarChart, Settings } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/course-registration', label: 'Course Registration', icon: <BookOpen size={20} /> },
    { path: '/grades', label: 'Grades', icon: <GraduationCap size={20} /> },
    { path: '/attendance', label: 'Attendance', icon: <Calendar size={20} /> },
    { path: '/chatbot', label: 'AI Assistant', icon: <MessageSquare size={20} /> },
    { path: '/counseling', label: 'Counseling', icon: <Users size={20} /> },
    { path: '/faculty/grades', label: 'Faculty Portal', icon: <BarChart size={20} /> },
    { path: '/admin', label: 'Admin Panel', icon: <Settings size={20} /> },
  ];

  return (
    <aside 
      className={`bg-blue-900 text-white w-64 flex-shrink-0 fixed inset-y-0 left-0 z-20 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out md:static`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <div className="text-xl font-bold">SmartEdu SMS</div>
          <button 
            className="text-white focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="px-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'text-blue-100 hover:bg-blue-800'
                    }`
                  }
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-blue-800 text-center">
          <div className="text-xs text-blue-300">© 2025 ABC Institute</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;