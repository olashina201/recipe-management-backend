import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';

export default class ErrorMiddleware {
  static handleError = () => {
    return async (error: HttpException, req: Request, res: Response, next: NextFunction) => {
      try {
        const status: number = error.status || 400;
        const response_code: number = error.responseCode || 400;
        const message: string = error.message || 'Something went wrong';
        const data: any[] = error.data || [];

        console.log(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(200).json({ status, response_code, message, data });
      } catch (error) {
        next(error);
      }
    };
  };

  static initializeUnhandledException = () => {
    process.on('unhandledRejection', (reason: Error) => {
      console.log(`[${reason.name}] >> ${reason.message}`);
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      throw reason;
    });

    process.on('uncaughtException', (error: Error) => {
      console.log(`[${error.name}] >> ${error.message}`);
      console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
      process.exit(1);
    });
  };
}
