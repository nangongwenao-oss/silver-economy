import React from 'react';
import { LucideIcon } from 'lucide-react';

// Colors
export const COLORS = {
  DEEP_BLUE: '#1A3E63',
  VIBRANT_ORANGE: '#FF8C00',
  SOFT_BLUE: '#6495ED',
  WHITE: '#FFFFFF',
  GRAY_TEXT: '#CBD5E1'
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', fullWidth, icon: Icon, className = '', ...props 
}) => {
  const baseStyles = "h-14 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg";
  
  const variants = {
    primary: `bg-[#FF8C00] text-white hover:bg-orange-600`,
    secondary: `bg-[#6495ED] text-white hover:bg-blue-500`,
    outline: `border-2 border-[#6495ED] text-[#6495ED] bg-transparent`
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={24} />}
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl ${className}`}>
    {children}
  </div>
);

export const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-white tracking-wide">{title}</h2>
    {subtitle && <p className="text-[#6495ED] text-lg mt-1">{subtitle}</p>}
  </div>
);

export const AgentStatusBadge: React.FC<{ status: 'idle' | 'working' }> = ({ status }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
    status === 'working' 
      ? 'bg-[#6495ED]/20 border-[#6495ED] text-[#6495ED]' 
      : 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
  }`}>
    <div className={`w-3 h-3 rounded-full ${status === 'working' ? 'animate-pulse bg-[#6495ED]' : 'bg-emerald-500'}`} />
    <span className="font-medium text-sm tracking-wider uppercase">
      {status === 'working' ? 'AI 协同中' : '数字小助 待命'}
    </span>
  </div>
);