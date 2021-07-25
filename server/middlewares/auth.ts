import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET } from '../consts';
import { UserInterface, UserRole } from '../models/models-types';

export const auth = async (
  req: Request<unknown, unknown, UserInterface>,
  res: Response<{ error: string }>,
  next: NextFunction,
) => {
  try {
    const token = req.headers['x-auth-token'] as string;
    if (!token) return res.json({ error: 'No token found.' });

    const verified = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!verified) return res.json({ error: 'Incorrect token.' });

    const user = await User.findById(verified.id);
    if (!user) return res.json({ error: 'User not found.' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};

export const authAdmin = async (
  req: Request<unknown, unknown, UserInterface>,
  res: Response<{ error: string }>,
  next: NextFunction,
) => {
  try {
    const token = req.headers['x-auth-token'] as string;

    const decoded = jwt.decode(token) as { id: string };

    const user = await User.findById(decoded.id);
    if (user?.role !== UserRole.Admin)
      return res.json({
        error: 'You dont have permission to perfom this operation.',
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  next();
};
