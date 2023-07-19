import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';

@Injectable()
export class GlobalHttpErrorHandlerService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry({
        count: 3,
        delay: (error, retryCount) => {
          return timer(retryCount * 3);
        },
      }),
      catchError((err: Error) => {
        console.log('Error caught by HTTP interceptor');
        return throwError(() => {
          console.log('Error rethrown by HTTP intecreptor');
          return err;
        });
      }),
    );
  }
}
