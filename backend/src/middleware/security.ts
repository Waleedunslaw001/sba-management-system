import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { pool } from '../config/database';

export const enforceSchoolBoundary = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const targetSchoolId = req.body.schoolId || req.query.schoolId || req.params.schoolId;
  
  if (targetSchoolId && Number(targetSchoolId) !== req.user?.schoolId) {
    return res.status(403).json({ 
      error: 'Access Denied: Violation of multi-tenant security boundary.' 
    });
  }
  next();
};

export const logActivity = (actionDescription: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    res.on('finish', async () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        try {
          const userId = req.user?.id || null;
          const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
          
          await pool.query(
            `INSERT INTO audit_logs (user_id, action, ip_address) 
             VALUES ($1, $2, $3)`,
            [userId, `${actionDescription} | Method: ${req.method} | Path: ${req.originalUrl}`, String(ipAddress)]
          );
        } catch (auditError) {
          console.error('Failure writing to Audit Log Ledger:', auditError);
        }
      }
    });
    next();
  };
};
