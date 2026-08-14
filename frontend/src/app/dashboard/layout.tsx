"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileSpreadsheet, GraduationCap, Menu, X, ShieldCheck } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500/30">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/30">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-black text-sm tracking-wide text-white uppercase">SBA Portal</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-xl border border-slate-700/50"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Responsive Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/80 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="space-y-8">
          <div className="hidden md:flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl shadow-lg shadow-indigo-600/20 ring-1 ring-white/10">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="font-black text-base text-white tracking-tight uppercase block">SBA Enterprise</span>
              <span className="text-[10px] font-mono text-indigo-400 tracking-wider uppercase">Management Suite</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link 
              href="/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-indigo-600/10 text-indigo-400 font-semibold text-xs border border-indigo-500/20 transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard Overview</span>
            </Link>
            <Link 
              href="/dashboard/scores" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 font-medium text-xs transition-all"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Direct Score Entry</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex items-center space-x-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs">
              AD
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">System Admin</p>
              <p className="text-[10px] text-slate-500 font-mono truncate">waleedunslaw</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center space-x-2 text-xs font-medium text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Academic Enterprise Console</span>
          </div>
          <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
            SESSION: 2025/2026
          </span>
        </header>

        <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
