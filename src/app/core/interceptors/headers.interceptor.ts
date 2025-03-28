import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('cart') || req.url.includes('categories')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')!,
        lang: localStorage.getItem('lang')!
      }
    })
  }

  return next(req);
};