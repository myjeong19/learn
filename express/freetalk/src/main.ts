import * as dotenv from 'dotenv';
dotenv.config();

import express, { urlencoded, json, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  newCommentRouter,
  deleteCommentRouter,
} from './routers';
import { requireAuth, currentUser } from '../common';

const app = express();

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.set('trust proxy', true);

app.use(currentUser);

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('route not found') as CustomError;
  error.status = 404;

  next(error);
});

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

// Error handling middleware
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: 'something went wrong' });
});

const start = async () => {
  if (!process.env.MONGO_HOST) {
    throw new Error('MONGO_HOST is required!');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is required!');
  }

  try {
    await mongoose.connect(process.env.MONGO_HOST);
  } catch (error) {
    throw new Error('database error!');
  }
};

start();

app.listen(8080, () => {});
