"use client";

import React from 'react';
import { Users, BookOpen, CheckCircle, AlertTriangle, Printer } from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const statistics = { totalStudents: 142, activeClasses: 6, pendingApprovals: 4, schoolAverage: 68.4 };
  const gradeDistribution = [
    { grade: 'A (70-100)', count: 32, color: 'bg-emerald-500' },
    { grade: 'B (60-69)', count: 45, color: 'bg-teal-500' },
    { grade: 'C (50-59)', count: 38, color: 'bg-indigo-500' },
    { grade: 'F (0-49)', count: 27, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="h-5 w-5" /></div>
          <div><div className="text-xs font-medium text-slate-500">Students</div><div className="text-xl font-bold text-slate-900">{statistics.totalStudents}</div></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><BookOpen className="h-5 w-5" /></div>
          <div><div className="text-xs font-medium text-slate-500">Classes</div><div className="text-xl font-bold text-slate-900">{statistics.activeClasses}</div></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertTriangle className="h-5 w-5" /></div>
          <div><div className="text-xs font-medium text-slate-500">Pending</div><div className="text-xl font-bold text-amber-600">{statistics.pendingApprovals}</div></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><CheckCircle className="h-5 w-5" /></div>
          <div><div className="text-xs font-medium text-slate-500">Average</div><div className="text-xl font-bold text-slate-900">{statistics.schoolAverage}%</div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Termly Grade Distribution</h3>
          <div className="space-y-3">
            {gradeDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{item.grade}</span>
                  <span className="text-slate-900">{item.count} Students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${(item.count / statistics.totalStudents) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h3>
          <Link href="/dashboard/reports/1" className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition text-sm text-slate-700 font-medium">
            <Printer className="h-4 w-4 text-slate-500" />
            <span>View Demo Report Card</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
