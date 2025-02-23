import React from 'react';
import { router } from '@inertiajs/react';

export const Logo = () => {
  return (
    <div className="relative group" onClick={() => router.visit('/')}>
      <div className="flex items-center gap-2 md:gap-3 px-2 md:px-5 py-3 cursor-pointer">
      <div className="relative">
        {/* Animated Hanger Icon */}
        <svg
        className="w-6 h-6 md:w-8 md:h-8 text-black group-hover:scale-110 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
          className="group-hover:stroke-[2]"
          d="M12 4C12.8284 4 13.5 4.67157 13.5 5.5C13.5 6.32843 12.8284 7 12 7C11.1716 7 10.5 6.32843 10.5 5.5C10.5 4.67157 11.1716 4 12 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          className="group-hover:stroke-[2]"
          d="M3.5 21C3.5 21 5 19.2 12 19.2C19 19.2 20.5 21 20.5 21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="group-hover:stroke-[2]"
          d="M12 7V13M12 13L19.2 17.7M12 13L4.8 17.7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        </svg>
        {/* Decorative Circle */}
        <div className="absolute -inset-2 bg-black/5 rounded-full blur-sm -z-10 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
        <span className="text-xl md:text-2xl font-black tracking-tight text-black">فليب</span>
        <span className="text-xl md:text-2xl font-light tracking-tight text-black">شيك</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 -mt-0.5">
        <span className="h-px w-3 bg-black/30" />
        <span className="text-[0.65rem] font-medium uppercase tracking-wider text-black/50">
          سوق الأزياء المستعملة
        </span>
        <span className="h-px w-3 bg-black/30" />
        </div>
      </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border border-black/0 rounded-xl group-hover:border-black/10 transition-colors duration-300" />
    </div>
  );
};
