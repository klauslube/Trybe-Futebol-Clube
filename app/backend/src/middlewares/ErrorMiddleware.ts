import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError';

const ErrorMiddleware = (err: CustomError, _req: Request, res:Response, _next:NextFunction) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal Server Error' });
};

export default ErrorMiddleware;
