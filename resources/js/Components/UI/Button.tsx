import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2 rounded-full transition-colors duration-200 text-sm font-medium';
  const variantStyles = {
    primary: 'bg-black hover:bg-gray-800 text-white disabled:bg-gray-400 disabled:cursor-not-allowed',
    outline: 'border-2 border-black hover:bg-gray-100 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300 disabled:cursor-not-allowed'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
