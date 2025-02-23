import React, { PropsWithChildren } from 'react';
import { NavMenu } from '@/Components/Navigation/NavMenu';
import { Logo } from '@/Components/UI/Logo';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm" dir="rtl">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <NavMenu />
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
