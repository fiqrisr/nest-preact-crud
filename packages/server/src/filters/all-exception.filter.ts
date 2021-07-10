import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { isObject } from 'util';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : null;

    const description =
      exception instanceof HttpException ? exception.message : 'unknown';

    if (!message) {
      return response.status(status).json({
        status: 'error',
        message: description
      });
    }

    if (typeof message === 'object' && !Array.isArray(message)) {
      return response.status(status).json({
        status: 'error',
        ...message
      });
    }

    return response.status(status).json({
      status: 'error',
      message
    });
  }
}
