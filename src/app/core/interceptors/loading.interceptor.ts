import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService)

  if (req.url.includes('cart')) {
    spinner.show('sub-spinner')
  } else {
    spinner.show('main-spinner')
  }
  return next(req).pipe(finalize(() => {
    spinner.hide('main-spinner')
    spinner.hide('sub-spinner')
  }))
};