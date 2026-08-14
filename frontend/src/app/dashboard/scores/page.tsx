"use client";

import React, { useState } from 'react';
import { Save, CloudLightning } from 'lucide-react';

export default function ScoreEntryPortal() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Rivera', admissionNo: 'ADM-2025-001', assignment: 9, test: 18, practical: 8.5, exam: 51 }
  ]);

  const handleScoreMutation = (id: number, field: string, val: string) => {
    const numericValue = parseFloat(val) || 0;
    if (field === 'assignment' && numericValue > 10) return;
    if (field === 'test' && numericValue > 20) return;
    if (field === 'practical' && numericValue > 10) return;
    if (field === 'exam' && numericValue > 60) return;

    setStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: numericValue } : s));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Direct Score Entry Sheet</h2>
          <p className="text-xs text-slate-500">Mathematics (MTH101) — Class: SS 1</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-medium text-xs hover:bg-slate-200 transition"><Save className="h-3.5 w-3.5" /> <span>Save</span></button>
          <button className="flex items-center space-x-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs hover:bg-indigo-700 transition shadow-sm"><CloudLightning className="h-3.5 w-3.5" /> <span>Submit</span></button>
        </div>
      </div>

      <div className="overflow-x-auto mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600">
              <th className="p-3">Student Info</th>
              <th className="p-3 text-center">Ass. (10)</th>
              <th className="p-3 text-center">Test (20)</th>
              <th className="p-3 text-center">Prac. (10)</th>
              <th className="p-3 text-center">Exam (60)</th>
              <th className="p-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
            {students.map((student) => {
              const total = student.assignment + student.test + student.practical + student.exam;
              return (
                <tr key={student.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-3">
                    <div className="font-semibold text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{student.admissionNo}</div>
                  </td>
                  <td className="p-3 text-center"><input type="number" className="w-16 border rounded p-1 text-center font-mono focus:ring-1 focus:ring-indigo-500" value={student.assignment} onChange={(e) => handleScoreMutation(student.id, 'assignment', e.target.value)} /></td>
                  <td className="p-3 text-center"><input type="number" className="w-16 border rounded p-1 text-center font-mono focus:ring-1 focus:ring-indigo-500" value={student.test} onChange={(e) => handleScoreMutation(student.id, 'test', e.target.value)} /></td>
                  <td className="p-3 text-center"><input type="number" className="w-16 border rounded p-1 text-center font-mono focus:ring-1 focus:ring-indigo-500" value={student.practical} onChange={(e) => handleScoreMutation(student.id, 'practical', e.target.value)} /></td>
                  <td className="p-3 text-center"><input type="number" className="w-16 border rounded p-1 text-center font-mono focus:ring-1 focus:ring-indigo-500" value={student.exam} onChange={(e) => handleScoreMutation(student.id, 'exam', e.target.value)} /></td>
                  <td className="p-3 text-center font-bold text-slate-900 font-mono">{total.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
