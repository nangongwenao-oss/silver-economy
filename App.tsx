import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, GraduationCap, UserCircle } from 'lucide-react';
import { LoginScreen, AssessmentScreen, JobScreen, LearningScreen } from './screens/OtherScreens';
import { WorkstationScreen } from './screens/WorkstationScreen';

// Navigation Component
const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/assessment', icon: UserCircle, label: '评估' },
    { path: '/workstation', icon: LayoutDashboard, label: '协同' },
    { path: '/jobs', icon: Briefcase, label: '岗位' },
    { path: '/learning', icon: GraduationCap, label: '学习' },
  ];

  if (location.pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A3E63]/95 backdrop-blur-lg border-t border-white/10 pb-4 pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 min-w-[64px] transition-colors duration-300 ${
              isActive ? 'text-[#FF8C00]' : 'text-gray-400'
            }`}
          >
            <item.icon size={isActive ? 28 : 24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/assessment'); // Go to assessment after login
  };

  return (
    <div className="h-screen w-full bg-[#1A3E63] text-white overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden p-6 relative">
        <Routes>
          <Route path="/" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/assessment" element={<AssessmentScreen />} />
          <Route path="/workstation" element={<WorkstationScreen />} />
          <Route path="/jobs" element={<JobScreen />} />
          <Route path="/learning" element={<LearningScreen />} />
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}