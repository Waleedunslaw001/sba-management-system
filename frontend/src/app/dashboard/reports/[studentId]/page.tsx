"use client";

import React from 'react';
import { Printer, ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function ComprehensiveReportCard() {
  const payload = {
    school: {
      name: "Excellence Academy Secondary School",
      address: "10 Tech Campus Way, Central District",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150"
    },
    student: {
      name: "Alex Rivera",
      admissionNo: "ADM-2025-001",
      class: "SS 1",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      position: "2nd",
      outOf: 35
    },
    attendance: { present: 58, total: 60 },
    subjects: [
      { code: 'MTH101', name: 'Mathematics', ass: 9.0, test: 18.0, prac: 8.5, exam: 51.0, total: 86.5, grade: 'A', comment: 'Outstanding computational precision' },
      { code: 'ENG101', name: 'English Language', ass: 8.0, test: 14.5, prac: 0.0, exam: 45.0, total: 67.5, grade: 'B', comment: 'Very good communicative expression' }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800 print:hidden">
        <Link href="/dashboard" className="flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white">
          <ChevronLeft className="h-4 w-4" /> <span>Dashboard</span>
        </Link>
        <button onClick={() => window.print()} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-600/30">
          <Printer className="h-4 w-4" /> <span>Print Official Report</span>
        </button>
      </div>

      {/* Main Print Canvas */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-xl print:shadow-none print:border-none print:p-0">
        
        {/* Header with School Branding */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6 mb-6">
          <img src={payload.school.logo} alt="School Logo" className="h-20 w-20 object-cover rounded-xl border border-slate-200" />
          <div className="text-center flex-1 px-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">{payload.school.name}</h1>
            <p className="text-xs text-slate-600 font-medium">{payload.school.address}</p>
            <p className="text-[10px] font-mono bg-slate-100 text-slate-800 inline-block px-3 py-0.5 rounded-full mt-2 border">Termly Statement of Performance</p>
          </div>
          <img src={payload.student.photo} alt="Student Photo" className="h-20 w-20 object-cover rounded-xl border border-slate-200" />
        </div>

        {/* Student & Performance Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-6 print:bg-transparent">
          <div><span className="text-slate-500">Student Name:</span> <p className="font-bold text-slate-900 text-sm">{payload.student.name}</p></div>
          <div><span className="text-slate-500">Admission No:</span> <p className="font-mono font-bold text-slate-900 text-sm">{payload.student.admissionNo}</p></div>
          <div><span className="text-slate-500">Class Rank / Position:</span> <p className="font-bold text-indigo-600 text-sm flex items-center space-x-1"><Award className="h-4 w-4 inline" /> <span>{payload.student.position} out of {payload.student.outOf}</span></p></div>
          <div><span className="text-slate-500">Attendance Ratio:</span> <p className="font-mono font-bold text-emerald-600 text-sm">{payload.attendance.present} / {payload.attendance.total} Days</p></div>
        </div>

        {/* Subject Score Table */}
        <table className="w-full text-left border-collapse border border-slate-300 text-xs mb-8">
          <thead>
            <tr className="bg-slate-900 text-white font-bold uppercase text-[10px]">
              <th className="p-2.5 border border-slate-400">Subject</th>
              <th className="p-2.5 text-center border border-slate-400">Ass (10)</th>
              <th className="p-2.5 text-center border border-slate-400">Test (20)</th>
              <th className="p-2.5 text-center border border-slate-400">Prac (10)</th>
              <th className="p-2.5 text-center border border-slate-400">Exam (60)</th>
              <th className="p-2.5 text-center border border-slate-400">Total (100)</th>
              <th className="p-2.5 text-center border border-slate-400">Grade</th>
              <th className="p-2.5 border border-slate-400">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {payload.subjects.map((sub, idx) => (
              <tr key={idx} className="font-medium">
                <td className="p-2.5 border border-slate-300 font-bold">{sub.name}</td>
                <td className="p-2.5 text-center border border-slate-300 font-mono">{sub.ass.toFixed(1)}</td>
                <td className="p-2.5 text-center border border-slate-300 font-mono">{sub.test.toFixed(1)}</td>
                <td className="p-2.5 text-center border border-slate-300 font-mono">{sub.prac.toFixed(1)}</td>
                <td className="p-2.5 text-center border border-slate-300 font-mono">{sub.exam.toFixed(1)}</td>
                <td className="p-2.5 text-center font-bold border border-slate-300 font-mono bg-slate-50">{sub.total.toFixed(1)}</td>
                <td className="p-2.5 text-center font-black border border-slate-300 text-indigo-600">{sub.grade}</td>
                <td className="p-2.5 border border-slate-300 italic text-slate-600 text-[11px]">{sub.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Endorsements */}
        <div className="mt-12 pt-8 border-t border-dashed border-slate-400 grid grid-cols-2 text-center text-xs gap-8">
          <div className="space-y-4">
            <div className="h-8 border-b border-slate-400 w-48 mx-auto" />
            <p className="font-bold text-slate-600 uppercase">Class Teacher Signature</p>
          </div>
          <div className="space-y-4">
            <div className="h-8 border-b border-slate-400 w-48 mx-auto" />
            <p className="font-bold text-slate-600 uppercase">Principal Approval Stamp</p>
          </div>
        </div>

      </div>
    </div>
  );
}
