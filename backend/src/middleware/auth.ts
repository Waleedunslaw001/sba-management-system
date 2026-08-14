import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    schoolId: number;
    role: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user: any) => {
    if (err) return res.status(403).json({ error: 'Token expired or invalid' });
    req.user = { id: user.id, schoolId: user.schoolId, role: user.role };
    next();
  });
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Unauthorized resource access' });
    }
    next();
  };
};
