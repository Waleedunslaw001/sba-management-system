import React from 'react';
import './globals.css';

export const metadata = {
  title: 'SBA Management Portal',
  description: 'Mobile-first School-Based Assessment System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
