import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  HttpException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExchangeError } from '../interfaces/error.interface';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof HttpException) {
          return throwError(() => err);
        }

        if (err?.name && err.name === 'SequelizeValidationError') {
          return throwError(() => new BadRequestException(mapSequelizeErrors(err)));
        }

        if (err instanceof Error) {
          if (err.message.indexOf('not found') > -1) {
            return throwError(() => new NotFoundException(err.message));
          }

          return throwError(() => new BadRequestException(this.cleanse(err.message)));
        }

        return throwError(() => new InternalServerErrorException(this.cleanse(err.toString())));
      })
    );
  }

  cleanse(message: string | string[]): string | string[] {
    let cleaner = message;

    if (message instanceof Array) {
      return message;
    }
    if (message.indexOf(',\n') > -1) {
      cleaner = message.split(',\n');
    }

    return cleaner;
  }
}
function mapSequelizeErrors(err: any): string {
  const errObj = {};
  err.errors.map((er) => {
    errObj[er.path] = er.message;
  });
  return JSON.stringify(errObj);
}
