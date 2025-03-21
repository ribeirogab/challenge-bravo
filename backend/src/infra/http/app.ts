import 'colors';
import 'reflect-metadata';
import 'express-async-errors';
import '@configs/dotenv';
import '@container/index';
import '@infra/databases/mongoose/connection';

import { errors as celebrateErrors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@errors/AppError';

import swaggerFile from '../../swagger.json';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(celebrateErrors());
app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      ...(error?.errorCode ? { code: error.errorCode } : {}),
    });
  }

  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

export { app };
