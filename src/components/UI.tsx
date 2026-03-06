import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, title, ...props }) => {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)} {...props}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  };

  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'success' | 'warning' | 'error' | 'info' }) {
  const variants = {
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-semibold", variants[variant])}>
      {children}
    </span>
  );
}

export function StMetric({ label, value, delta, deltaColor = 'green' }: { label: string; value: string; delta?: string; deltaColor?: 'green' | 'red' }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        {delta && (
          <span className={cn("text-sm font-medium", deltaColor === 'green' ? "text-emerald-600" : "text-red-600")}>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

export function StWidget({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="mb-6">
      {label && <h3 className="text-lg font-bold text-slate-800 mb-3">{label}</h3>}
      {children}
    </div>
  );
}
