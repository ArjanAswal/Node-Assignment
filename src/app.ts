import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import manufacturerRouter from './routes/manufacturerRouter';
import equipmentRouter from './routes/equipmentRouter';
import 'express-async-errors';

const app = express();

app.enable('trust proxy');

// Global Middlewares

// Implement Cors
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(compression());

// App Routes
app.use('/manufacturer', manufacturerRouter);
app.use('/equipment', equipmentRouter);

app.all('*', (req) => {
  throw new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

app.use(globalErrorHandler);

export default app;
