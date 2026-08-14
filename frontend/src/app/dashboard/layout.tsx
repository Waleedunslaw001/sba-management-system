"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileSpreadsheet, GraduationCap } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Structural Mobile Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-100 border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-indigo-400" />
          <span className="font-bold text-lg tracking-wider">SBA-PORTAL</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium transition-all">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/dashboard/scores" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Score Entry</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 md:px-8 shadow-sm">
          <h1 className="text-lg md:text-xl font-bold text-slate-800">Academic Enterprise Console</h1>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">Active Session: 2025/2026</span>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
