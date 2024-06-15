import { Request, Response } from 'express';
import Institution from '../models/Institution';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const institution = new Institution({ name, email, password });
    await institution.save();

    const token = jwt.sign({ id: institution._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.status(201).json({ institution, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const institution = await Institution.findOne({ email });
    if (!institution) {
      res.status(404).json({ message: 'Institution not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, institution.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: institution._id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    res.json({ institution, token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
