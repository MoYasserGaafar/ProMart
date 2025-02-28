import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  wishlistCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  //Declares a public property named <wishlistCounter> and types it as a <BehaviorSubject<number>>. So <wishlistCounter> is an Observable that can emit values of type number.
  //<= new BehaviorSubject(0)>: Initializes the <wishlistCounter> BehaviorSubject with an initial value of 0. This initial value will be emitted to any observer that subscribes to the <wishlistCounter> Observable.
  //Defines a <BehaviorSubject> to manage the number of items in the wishlist. 

  headers = { token: localStorage.getItem('token')! }
  //Defines a property that holds an object containing an authorization token retrieved from local storage. 
  //<!>: Asserts that <localStorage.getItem('token')> will not be null.

  constructor(private _HttpClient: HttpClient) { }
  //<constructor>: Class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.

  getLoggedUserWishlist = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/wishlist', {
      headers: { ...this.headers }
    })
  }

  addProductToWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/wishlist', 
      {
        productId, 
      },
      {
      headers: { ...this.headers }
    })
  }

  removeProductFromWishlist = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/wishlist/' + productId, {
      headers: { ...this.headers }
    })
  }
}