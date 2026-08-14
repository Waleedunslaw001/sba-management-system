"use client";

import React from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowRight, ShieldAlert } from 'lucide-react';

export default function LandingGate() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-6">
        
        {/* Core Branding */}
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <GraduationCap className="h-10 w-10" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight uppercase mt-2">SBA Enterprise</h1>
          <p className="text-xs text-slate-400 font-medium">School-Based Assessment Management System</p>
        </div>

        <hr className="border-slate-700" />

        {/* Informational Profile Box */}
        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 text-left space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Demonstration Access Mode</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The core engine database is initialized. Tap below to launch your workspace metrics panel, score sheets, and standard hardcopy report documents.
          </p>
        </div>

        {/* Action Button Gateway */}
        <Link href="/dashboard" className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all w-full group">
          <span>Enter Management Portal</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        
      </div>
      
      <p className="text-[10px] text-slate-600 font-mono mt-8">Secure Layer Architecture • iOS Optimized Build v1.0</p>
    </div>
  );
}
