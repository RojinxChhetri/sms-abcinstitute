import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login validation
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    
    // For demo purposes, accept any non-empty credentials
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">SmartEdu SMS</h1>
          <p className="text-gray-600 mt-2">ABC Institute Student Management System</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                Login As
              </label>
              <select
                id="userType"
                className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 rounded-md w-full py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            
            <Button type="submit" fullWidth>
              <LogIn size={18} className="mr-2" />
              Log In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>For demonstration purposes:</p>
            <p>Use any username and password to log in</p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 ABC Institute. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;