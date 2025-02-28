import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
//Indicates that <authGuard> is a guard function used for route activation.
  const _Router = inject(Router)
  //Injects the <Router> service into the guard function using the <inject> function. 
  //Allows the guard to programmatically navigate to different routes.

  //Conditional Statement checks if a token exists in local storage and returns true or false based on the presence of the token.
  if (localStorage.getItem('token') != null) {
    return true;
  } else {
    _Router.navigate(['signin'])
    return false;
  }
};