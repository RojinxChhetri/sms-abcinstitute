import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { dummyData } from '../data/dummyData';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            className="text-gray-500 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <div className="ml-4 md:ml-0 flex items-center">
            <div className="font-bold text-xl text-blue-900">ABC Institute</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div className="relative">
            <button 
              className="flex items-center focus:outline-none"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                {dummyData.student.name}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;