### Angular Error Handling

### 1. try / catch

catch synchronous errors

### 2. rxjs `catchError((e) => throwError(e))`

catch asynchronous errors in `pipe`

### 3. Implement `ErrorHandler`
```
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  handleError(error) {
    // your custom error handling logic    
  }
}
```

### 4.HTTP errors: implement `HttpInterceptor` (for example with refresh token / retry logic)
```
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
```

#### Resources
- https://www.youtube.com/watch?v=e03EHZIVJtM&t=183s&ab_channel=DecodedFrontend
- https://medium.com/angular-in-depth/expecting-the-unexpected-best-practices-for-error-handling-in-angular-21c3662ef9e4
