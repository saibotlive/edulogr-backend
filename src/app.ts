import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import institutionRoutes from './routes/institutionRoutes';
import incidentRoutes from './routes/incidentRoutes';

// Determine the correct .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const app = express();
app.use(cors());
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
