import express from 'express';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import institutionRoutes from './routes/institutionRoutes';
import incidentRoutes from './routes/incidentRoutes';

// Determine the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const app = express();

// Configure CORS to allow requests from your Vercel frontend
const allowedOrigins = ['https://edulogr.vercel.app', 'http://localhost:5173'];
const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/institutions', institutionRoutes);
app.use('/api/incidents', incidentRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
