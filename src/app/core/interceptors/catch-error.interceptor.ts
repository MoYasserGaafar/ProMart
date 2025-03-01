import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastr = inject(ToastrService)
  
  return next(req).pipe(catchError((err) => {
    //console.log(err);
    toastr.error(err.message)
    return throwError(() => err)
  }));
};