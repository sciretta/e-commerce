import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { _LeanDocument } from 'mongoose';
import { UserInterface } from '../models/models-types';
import User from '../models/user';
import { JWT_SECRET } from '../consts';

// @desc    Create User.
// @route   POST /user/signin
// @access  Public

export const createUser = async (
  req: Request<unknown, unknown, UserInterface>,
  res: Response<{ error: string } | { userCreated: UserInterface }>,
) => {
  const { email, password } = req.body;

  //validations
  if (!email || !password)
    return res
      .status(400)
      .json({ error: 'Not all required fields have been entered.' });

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  if (existingUser)
    return res
      .status(400)
      .json({ error: 'An account with this email already exists.' });

  //encrypt the password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //create new user
  let userCreated;
  try {
    userCreated = await User.create({
      email,
      password: passwordHash,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  console.log({ userCreated });

  return res
    .status(200)
    .json({ userCreated: { email: userCreated.email, id: userCreated._id } });
};

// @desc    login User.
// @route   POST /user/login
// @access  Public

export const loginUser = async (
  req: Request<unknown, unknown, UserInterface>,
  res: Response<{ error: string } | { user: UserInterface; token: string }>,
) => {
  const { email, password } = req.body;

  // validate
  if (!email || !password)
    return res.status(400).json({ error: 'Not all fields have been entered.' });

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }

  if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);

  return res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
    },
  });
};
