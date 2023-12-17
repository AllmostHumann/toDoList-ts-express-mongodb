import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import tasksRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import env from './util/validateEnv.js';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './middleware/auth.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://todolist-ts-mern-backend.vercel.app/',
    ],
    credentials: true,
  }),
);

app.use(morgan('dev'));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  }),
);

app.use('/api/users', userRoutes);
app.use('/api/tasks', requiresAuth, tasksRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
