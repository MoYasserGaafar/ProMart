import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService)
  //Injects the <ToastrService> into the interceptor, allowing it to use the service's methods to display toast notifications.
  
  return next(req).pipe(catchError((err) => {
  //Passes the original request to the next interceptor or the actual HTTP request handler using the <next> function.
  //<pipe>: Operator used to chain additional operators to the observable returned by <next(req)>.
  //<catchError>: Operator is used to handle errors that might occur during the HTTP request.
    //console.log(err);
    //Logs the error to the console, which can be helpful for debugging purposes and identifying the root cause of the error.
    toastr.error(err.message)
    //Displays an error toast notification using the <toastr.error> method.
    return throwError(() => err)
    //Rethrows the error using the <throwError> operator, which allows the error to be handled by other interceptors or by the component that made the original request.
  }));
};