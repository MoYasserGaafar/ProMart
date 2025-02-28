import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('cart') || req.url.includes('categories')) {
  //Condition that checks if the request URL contains either "cart" or "categories", which indicates that the request is related to cart or category operations and requires authentication.
    req = req.clone({
    //Clones the incoming request and adds an authorization header to it.
      setHeaders: {
        token: localStorage.getItem('token')!,
        //Sets the <token> header to the value stored in local storage. 
        //<!>: Non-null assertion operator, assumes that the token exists in local storage.
        lang: localStorage.getItem('lang')!
        //Sets the <lang> header to the language preference stored in local storage.
        //<!>: Non-null assertion operator, assumes that the language exists in local storage.
      }
    })
  }

  return next(req);
  //Passes the modified request to the next interceptor or the actual HTTP request handler to proceed with the request pipeline.
};