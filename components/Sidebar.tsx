
import React from 'react';
import { NAV_ITEMS, ICONS } from '../constants';
import { User } from '../types';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, user, onLogout }) => {
    
  return (
    <aside className="w-64 bg-saric-medium flex-shrink-0 p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center mb-10 pl-2">
            <div className="bg-saric-blue p-2 rounded-lg flex items-center justify-center h-10 w-10">
                 <span className="text-white font-bold text-lg">SE</span>
            </div>
            <h1 className="text-xl font-bold ml-3 text-white">SARIC Eng.</h1>
        </div>
        <nav>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  onClick={() => setCurrentView(item.id)}
                  disabled={item.disabled}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    currentView === item.id
                      ? 'bg-saric-blue text-white'
                      : 'text-gray-400 hover:bg-saric-light hover:text-white'
                  } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-saric-light pt-4">
        <div className="flex items-center mb-4 px-2">
            <div className="h-10 w-10 rounded-full bg-saric-blue flex items-center justify-center text-white font-bold text-lg mr-3">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
                <p className="text-white font-semibold truncate">{user.name}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{user.role}</p>
            </div>
        </div>
        
        <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-saric-light hover:text-red-400 transition-colors duration-200"
        >
            <span className="mr-2">{ICONS.logout}</span>
            Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
