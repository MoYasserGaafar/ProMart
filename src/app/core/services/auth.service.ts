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
  constructor(private _HttpClient: HttpClient) { }
  private readonly _Router = inject(Router)

  signup = (user: any): Observable<any> => {

    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
  }

  signin = (user: any): Observable<any> => {
    console.log(user)
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    this._Router.navigate(["/signin"])
    //Navigate the user to the sign-in page
  }

  saveUserData = () => {
    let token = localStorage.getItem('token')

    if (token) {
      try {
        let decode = jwtDecode(token)
        //Decodes the JWT token using the <jwtDecode> function.
        console.log(decode);
      } catch (error) {
        this._Router.navigate(['signin'])
        localStorage.clear()
      }
    }
  }

  forgotPasswords = (email: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/forgotPasswords', email);
  }

  verifyResetCode = (code: any): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/verifyResetCode', code);
  }

  resetPassword = (newPassword: any): Observable<any> => {
    return this._HttpClient.put(baseUrl + 'api/v1/auth/resetPassword', newPassword);
  }
}