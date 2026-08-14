import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { pool } from '../config/database';

export const getReportCard = async (req: AuthenticatedRequest, res: Response) => {
  const { studentId, termId } = req.params;

  try {
    const reportQuery = await pool.query(
      `SELECT 
        s.admission_no, u.full_name, c.name as class_name,
        sub.name as subject_name, sub.code as subject_code,
        score.assignment_score, score.test_score, score.practical_score, score.exam_score, score.total_score,
        (SELECT grade FROM grading_systems g WHERE score.total_score BETWEEN g.min_score AND g.max_score AND g.school_id = u.school_id LIMIT 1) as grade
       FROM students s
       JOIN users u ON s.user_id = u.id
       JOIN classes c ON s.class_id = c.id
       JOIN assessment_scores score ON score.student_id = s.id
       JOIN subjects sub ON score.subject_id = sub.id
       WHERE s.id = $1 AND score.term_id = $2 AND score.status = 'APPROVED'`,
      [studentId, termId]
    );

    if (reportQuery.rowCount === 0) {
      return res.status(404).json({ error: 'No approved records discovered matching criteria selections.' });
    }

    res.status(200).json({ student: reportQuery.rows[0].full_name, admissionNo: reportQuery.rows[0].admission_no, class: reportQuery.rows[0].class_name, marks: reportQuery.rows });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
