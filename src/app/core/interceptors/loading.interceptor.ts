import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let spinner = inject(NgxSpinnerService)
  //Injects the <NgxSpinnerService> into the interceptor to control spinner visibility.
  
  //If the URL includes <cart> or indicates cart-related requests, it  shows a secondary spinner named <sub-spinner>.
  //Otherwise, it shows a primary spinner named <main-spinner>.
  if (req.url.includes('cart')) {
    spinner.show('sub-spinner')
  } else {
    spinner.show('main-spinner')
  }
  return next(req).pipe(finalize(() => {
  //Returns the modified request to the next interceptor or the actual HTTP request handler using the <next> function.
  //<pipe> operator: Used to chain the <finalize> operator to the observable returned by <next(req)>.
    spinner.hide('main-spinner')
    spinner.hide('sub-spinner')
    //Hides both the <main-spinner> and <sub-spinner> ensuring the spinners are hidden after the request is complete.
  }))
};