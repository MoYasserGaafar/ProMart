import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);

  const user = _AuthService.getUser();

  if (user?.email === 'superadmin@gmail.com' && user?.password === 'SuperAdmin@Password25') {
    return true; 
  } else {
    _Router.navigate(['/signin']); 
    return false;
  }
};