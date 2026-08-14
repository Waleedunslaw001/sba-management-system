import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { pool } from '../config/database';

export const upsertScores = async (req: AuthenticatedRequest, res: Response) => {
  const { studentId, termId, subjectId, assignmentScore, testScore, practicalScore, examScore } = req.body;
  const teacherId = req.user?.id;

  try {
    // Structural Guardrail: Ensure teacher is assigned to this target context
    const assignmentCheck = await pool.query(
      `SELECT ts.id FROM teacher_subjects ts 
       JOIN students s ON s.class_id = ts.class_id
       WHERE ts.teacher_id = $1 AND s.id = $2 AND ts.subject_id = $3`,
      [teacherId, studentId, subjectId]
    );

    if (assignmentCheck.rowCount === 0 && req.user?.role !== 'SCHOOL_ADMIN') {
      return res.status(403).json({ error: 'Access Denied: You are not assigned to instruct this class matrix.' });
    }

    const result = await pool.query(
      `INSERT INTO assessment_scores (student_id, term_id, subject_id, assignment_score, test_score, practical_score, exam_score, status, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'DRAFT', $8)
       ON CONFLICT (student_id, term_id, subject_id) 
       DO UPDATE SET assignment_score = $4, test_score = $5, practical_score = $6, exam_score = $7, status = 'DRAFT', updated_by = $8, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [studentId, termId, subjectId, assignmentScore, testScore, practicalScore, examScore, teacherId]
    );

    res.status(200).json({ message: 'Draft assessment metrics stored.', data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const submitScores = async (req: AuthenticatedRequest, res: Response) => {
  const { studentId, termId, subjectId } = req.body;
  try {
    await pool.query(
      `UPDATE assessment_scores SET status = 'SUBMITTED' WHERE student_id = $1 AND term_id = $2 AND subject_id = $3`,
      [studentId, termId, subjectId]
    );
    res.status(200).json({ message: 'Scores submitted to administration queue.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const approveScores = async (req: AuthenticatedRequest, res: Response) => {
  const { studentId, termId, subjectId } = req.body;
  try {
    await pool.query(
      `UPDATE assessment_scores SET status = 'APPROVED' WHERE student_id = $1 AND term_id = $2 AND subject_id = $3`,
      [studentId, termId, subjectId]
    );
    res.status(200).json({ message: 'Scores approved and permanently archived.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
