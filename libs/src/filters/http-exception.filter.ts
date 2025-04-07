import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../common/errors/base-exception.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();

    let status = 500;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    let details: any = null;

    if (exception instanceof BaseException) {
      status = exception.statusCode;
      message = exception.message;
      errorCode = exception.constructor.name.toUpperCase();
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      errorCode = 'HTTP_EXCEPTION';
      details = (exception.getResponse() as any)?.message || null;
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
      timestamp,
      path: request.url,
      method: request.method,
      details,
    });
  }
}
