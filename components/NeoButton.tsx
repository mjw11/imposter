import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = "relative font-display uppercase tracking-wider font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  // Tactical borders and glows instead of neo-brutalism
  const variants = {
    primary: "border border-spy-cyan text-spy-cyan hover:bg-spy-cyan/10 shadow-glow-cyan",
    secondary: "border border-spy-dim text-spy-dim hover:bg-spy-dim/10",
    danger: "border border-spy-red text-spy-red hover:bg-spy-red/10 shadow-glow-red",
    success: "border border-spy-green text-spy-green hover:bg-spy-green/10 shadow-glow-green",
    neutral: "border border-spy-border text-spy-text bg-spy-surface hover:border-spy-cyan hover:text-spy-cyan",
  };

  const sizes = {
    sm: "px-3 py-1 text-xs rounded-sm",
    md: "px-6 py-3 text-sm rounded-sm",
    lg: "px-8 py-4 text-lg rounded-sm",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], fullWidth ? "w-full" : "", className)}
      {...props}
    >
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 translate-y-[-100%] group-hover:animate-scan pointer-events-none" />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};