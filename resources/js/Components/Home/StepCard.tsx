import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  hasLearnMore?: boolean;
}

export const StepCard = ({ number, title, description, Icon, hasLearnMore }: StepCardProps) => {
  return (
    <div className="group p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg border border-transparent hover:border-gray-100">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <Icon className="w-6 h-6 text-black" />
            </div>
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center">
              {number}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {description}
          </p>
        </div>

        {hasLearnMore && (
          <a 
            href="#" 
            className="text-black font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
          >
            اعرف المزيد
            <svg 
              className="w-4 h-4 transform rotate-180 transition-transform group-hover:translate-x-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};
