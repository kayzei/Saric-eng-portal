
import React, { useState } from 'react';
import { Role, User } from '../types';
import Button from './shared/Button';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(Role.VIEWER);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    onLogin({ name, role });
  };

  return (
    <div className="flex h-screen bg-saric-dark items-center justify-center p-4">
      <div className="bg-saric-medium p-8 rounded-lg shadow-2xl w-full max-w-md border border-saric-light">
        <div className="flex justify-center mb-6">
            <div className="bg-saric-blue p-3 rounded-xl flex items-center justify-center h-16 w-16">
                 <span className="text-white font-bold text-2xl">SE</span>
            </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to SARIC Engineering Data Portal</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              className="w-full bg-saric-light text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-saric-blue focus:border-transparent transition-all"
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="mb-8">
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full bg-saric-light text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-saric-blue focus:border-transparent transition-all appearance-none"
            >
              <option value={Role.VIEWER}>Viewer (Read Only)</option>
              <option value={Role.MANAGER}>Manager (Edit Projects/Suppliers)</option>
              <option value={Role.ADMIN}>Admin (Full Access)</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <Button type="submit" className="w-full py-3">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
