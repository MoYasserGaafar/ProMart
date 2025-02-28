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
  //<constructor>: class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.
  private readonly _Router = inject(Router)
  //Injects the <Router> service into the current class and stores it in a private and readonly property named <_Router>.
  //Allows the class to use the methods of the <Router> service to programmatically navigate to different routes within the application.

  signup = (user: any): Observable<any> => {
  //Function will return an observable that emits data of any type.

    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user);
    //Returns an <Observable> that represents the result of the signup request to the backend API. 
    //Uses the injected <HttpClient> service to send the POST request.
  }

  signin = (user: any): Observable<any> => {
    console.log(user)
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user);
  }

  logout(): void {
    // Remove the <token> and <data> keys from local storage, effectively clearing the user's session.
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    this._Router.navigate(["/signin"])
    //Navigate the user to the sign-in page
  }

  saveUserData = () => {
    let token = localStorage.getItem('token')
    //Retrieves the value stored in local storage under the key <'token'> and assigns it to the token variable.

    if (token) {
      //Handle potential errors that might occur during the code execution within the try block.
      try {
        let decode = jwtDecode(token)
        //Decodes the JWT token using the <jwtDecode> function.
        console.log(decode);
      } catch (error) {
        this._Router.navigate(['signin'])
        localStorage.clear()
        //If an error occurs during token decoding, the entire local storage will be cleared.
      }
    }

    /*
    //Checks if the token variable is not null or undefined.
    if (token) {
      let decode = jwtDecode(token)
      //Decodes the JWT token using the <jwtDecode> function.
      console.log(decode);
    } else {
      localStorage.clear()
      //Clears all items from the browser's local storage if the <token> is not found.
    }
    */
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