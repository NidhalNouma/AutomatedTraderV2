import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  hover = false,
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';

  const variantClasses = {
    default: 'bg-neutral-950/90 border-neutral-800/30',
    gradient: 'bg-gradient-to-br from-neutral-950/90 to-neutral-900/80 backdrop-blur-xl border-neutral-800/30',
    glass: 'bg-white/5 backdrop-blur-xl border-white/10',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  const hoverClasses = hover 
    ? 'hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/10 hover:scale-[1.02]' 
    : '';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;