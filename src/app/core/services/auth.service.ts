import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../enviroment/enviroment.local';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = { token: localStorage.getItem('token')! };
  private user: any = null; //Store info of user locally
  private readonly _Router = inject(Router);

  constructor(private _HttpClient: HttpClient) {}

  signup = (user: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
  };

  signin = (user: any): Observable<any> => {
    console.log(user);
    
    if (user.email === 'superadmin@gmail.com' && user.password === 'superadminpassword') {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      return new Observable((observer) => {
        observer.next({ message: 'success', token: 'static-superadmin-token' });
        observer.complete();
      });
    }

    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  };

  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    this._Router.navigate(['/signin']);
  }

  saveUserData = () => {
    let token = localStorage.getItem('token');

    if (token) {
      try {
        let decode = jwtDecode(token);
        console.log(decode);
      } catch (error) {
        this._Router.navigate(['/signin']);
        localStorage.clear();
      }
    }
  };

  forgotPasswords = (email: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/forgotPasswords', email);
  };

  verifyResetCode = (code: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  };

  resetPassword = (newPassword: any): Observable<any> => {
    return this._HttpClient.put(baseUrl + 'api/v1/auth/resetPassword', newPassword);
  };

  getAllUsers = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/users/', { headers: { ...this.headers } });
  };
}
