"use client";

import React from 'react';
import { Printer, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudentTerminalReportCard() {
  const payload = {
    studentName: 'Alex Rivera',
    admissionNo: 'ADM-2025-001',
    className: 'SS 1',
    term: '1st Term',
    academicYear: '2025/2026',
    subjects: [
      { code: 'MTH101', name: 'Mathematics', ass: 9.0, test: 18.0, prac: 8.5, exam: 51.0, total: 86.5, grade: 'A', comment: 'Excellent master of content' },
      { code: 'ENG101', name: 'English Language', ass: 8.0, test: 14.5, prac: 0.0, exam: 45.0, total: 67.5, grade: 'B', comment: 'Very good communicative competency' }
    ]
  };

  const executeNativePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Navigation Control Panel (Hidden on Hardcopy Print Layouts) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <Link href="/dashboard" className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition">
          <ChevronLeft className="h-4 w-4" /> <span>Back to Dashboard</span>
        </Link>
        <button onClick={executeNativePrint} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm transition">
          <Printer className="h-4 w-4" /> <span>Print Report Card</span>
        </button>
      </div>

      {/* Official Terminal Certificate Card Canvas Area */}
      <div className="bg-white p-6 md:p-8 border border-slate-300 rounded-2xl shadow-sm print:border-none print:shadow-none print:p-0">
        <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 uppercase">Excellence Academy Secondary School</h2>
          <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">10 Tech Campus Way | Official Terminal Statement of Results</p>
        </div>

        {/* Student Metadata Parameters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 text-xs md:text-sm bg-slate-50 p-4 rounded-xl mb-6 print:bg-transparent print:p-0 print:border-b print:pb-4 print:rounded-none">
          <div><span className="text-slate-400 font-medium">Student Name:</span> <strong className="text-slate-900 block md:inline">{payload.studentName}</strong></div>
          <div><span className="text-slate-400 font-medium">Admission Number:</span> <strong className="text-slate-900 block md:inline font-mono">{payload.admissionNo}</strong></div>
          <div><span className="text-slate-400 font-medium">Class Framework:</span> <strong className="text-slate-900 block md:inline">{payload.className}</strong></div>
          <div><span className="text-slate-400 font-medium">Academic Term:</span> <strong className="text-slate-900 block md:inline">{payload.term}</strong></div>
          <div><span className="text-slate-400 font-medium">Session:</span> <strong className="text-slate-900 block md:inline font-mono">{payload.academicYear}</strong></div>
        </div>

        {/* Metrics Matrix Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-300 text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-900 text-white border border-slate-900 font-bold uppercase tracking-wider text-[10px] md:text-xs">
                <th className="p-2.5 border border-slate-400">Subject Name</th>
                <th className="p-2.5 text-center border border-slate-400">Ass (10)</th>
                <th className="p-2.5 text-center border border-slate-400">Test (20)</th>
                <th className="p-2.5 text-center border border-slate-400">Prac (10)</th>
                <th className="p-2.5 text-center border border-slate-400">Exam (60)</th>
                <th className="p-2.5 text-center border border-slate-400">Total (10)</th>
                <th className="p-2.5 text-center border border-slate-400">Grade</th>
                <th className="p-2.5 border border-slate-400 hidden md:table-cell print:table-cell">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {payload.subjects.map((sub, idx) => (
                <tr key={idx} className="font-medium text-slate-800">
                  <td className="p-2.5 border border-slate-300 font-bold text-slate-900">{sub.name} <span className="text-[10px] text-slate-400 font-mono block md:inline md:ml-1">({sub.code})</span></td>
                  <td className="p-2.5 text-center font-mono border border-slate-300">{sub.ass.toFixed(1)}</td>
                  <td className="p-2.5 text-center font-mono border border-slate-300">{sub.test.toFixed(1)}</td>
                  <td className="p-2.5 text-center font-mono border border-slate-300">{sub.prac.toFixed(1)}</td>
                  <td className="p-2.5 text-center font-mono border border-slate-300">{sub.exam.toFixed(1)}</td>
                  <td className="p-2.5 text-center font-bold font-mono border border-slate-300 bg-slate-50 print:bg-transparent">{sub.total.toFixed(1)}</td>
                  <td className="p-2.5 text-center font-black border border-slate-300 text-indigo-600 print:text-black">{sub.grade}</td>
                  <td className="p-2.5 border border-slate-300 italic text-slate-500 text-xs hidden md:table-cell print:table-cell">{sub.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Validation Footnote Signature Area */}
        <div className="mt-12 pt-8 border-t border-dashed border-slate-400 grid grid-cols-2 text-center text-xs gap-8">
          <div className="space-y-4">
            <div className="h-8 border-b border-slate-400 w-48 mx-auto" />
            <p className="font-semibold text-slate-500 uppercase tracking-wide">Class Teacher Endorsement</p>
          </div>
          <div className="space-y-4">
            <div className="h-8 border-b border-slate-400 w-48 mx-auto" />
            <p className="font-semibold text-slate-500 uppercase tracking-wide">Principal Authentication Seal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
