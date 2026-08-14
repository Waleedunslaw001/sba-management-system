import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { pool } from '../config/database';

export const getReportCard = async (req: AuthenticatedRequest, res: Response) => {
  const { studentId, termId } = req.params;

  try {
    // 1. Fetch Student & School Branding Details
    const studentQuery = await pool.query(
      `SELECT 
        s.id as student_id, s.admission_no, u.full_name as student_name, u.photo_url as student_photo,
        c.id as class_id, c.name as class_name, sch.name as school_name, sch.address as school_address, sch.logo_url
       FROM students s
       JOIN users u ON s.user_id = u.id
       JOIN classes c ON s.class_id = c.id
       JOIN schools sch ON u.school_id = sch.id
       WHERE s.id = $1`,
      [studentId]
    );

    if (studentQuery.rowCount === 0) {
      return res.status(404).json({ error: 'Student profile not found.' });
    }

    const studentData = studentQuery.rows[0];

    // 2. Fetch Score Matrix + Grades
    const scoresQuery = await pool.query(
      `SELECT 
        sub.name as subject_name, sub.code as subject_code,
        score.assignment_score, score.test_score, score.practical_score, score.exam_score, score.total_score,
        (SELECT grade FROM grading_systems g WHERE score.total_score BETWEEN g.min_score AND g.max_score AND g.school_id = c.school_id LIMIT 1) as grade,
        (SELECT comment FROM grading_systems g WHERE score.total_score BETWEEN g.min_score AND g.max_score AND g.school_id = c.school_id LIMIT 1) as comment
       FROM assessment_scores score
       JOIN subjects sub ON score.subject_id = sub.id
       JOIN classes c ON c.id = $2
       WHERE score.student_id = $1 AND score.term_id = $3`,
      [studentId, studentData.class_id, termId]
    );

    // 3. Fetch Attendance Aggregates
    const attendanceQuery = await pool.query(
      `SELECT 
        COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) as days_present,
        COUNT(CASE WHEN status = 'ABSENT' THEN 1 END) as days_absent,
        COUNT(id) as total_days
       FROM attendance 
       WHERE student_id = $1 AND term_id = $2`,
      [studentId, termId]
    );

    res.status(200).json({
      school: { name: studentData.school_name, address: studentData.school_address, logo: studentData.logo_url },
      student: { 
        name: studentData.student_name, 
        admissionNo: studentData.admission_no, 
        class: studentData.class_name, 
        photo: studentData.student_photo 
      },
      attendance: attendanceQuery.rows[0] || { days_present: 0, days_absent: 0, total_days: 0 },
      scores: scoresQuery.rows
    });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
