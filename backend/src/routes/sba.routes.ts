import { Router } from 'express';
import { upsertScores, submitScores, approveScores } from '../controllers/sba.controller';
import { getReportCard } from '../controllers/report.controller';
import { authenticateToken, requireRole } from '../middleware/auth';
import { enforceSchoolBoundary, logActivity } from '../middleware/security';

const router = Router();

router.post('/scores', authenticateToken, requireRole(['TEACHER', 'SCHOOL_ADMIN']), enforceSchoolBoundary, logActivity('Saved assessment draft matrix entry'), upsertScores);
router.post('/scores/submit', authenticateToken, requireRole(['TEACHER']), logActivity('Submitted assessments for administrative validation check'), submitScores);
router.post('/scores/approve', authenticateToken, requireRole(['SCHOOL_ADMIN']), enforceSchoolBoundary, logActivity('Authorized official result publication parameters'), approveScores);
router.get('/report/:studentId/:termId', authenticateToken, getReportCard);

export default router;
