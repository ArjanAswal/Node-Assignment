import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import logger from './../utils/logger';

const sendErrorDev = (err: AppError, res: Response) => {
  switch (err.name) {
    case 'CastError':
      res.status(404).json({
        status: err.status,
        message: 'Resource not found',
      });
      break;

    case 'ValidationError':
      res.status(400).json({
        status: err.status,
        message: 'Invalid data',
      });
      break;

    case 'jsonld.SyntaxError':
      res.status(400).json({
        status: err.status,
        message: err.message,
      });
      break;

    case 'MongoServerError':
      res.status(400).json({
        status: err.status,
        message: 'Invalid data',
      });
      break;

    default:
      res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
      break;
  }
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    logger.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    const error = { ...err };
    sendErrorProd(error, res);
  }
};
