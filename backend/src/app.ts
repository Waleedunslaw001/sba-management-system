import express from 'express';
import cors from 'cors';
import sbaRoutes from './routes/sba.routes';
import { Response, Request } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

// Bind the SBA operational routes to the base API path
app.use('/api/sba', sbaRoutes);

// Health check endpoint for monitoring uptime
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'Live', platform: 'SBA Engine Core' });
});

export default app;
