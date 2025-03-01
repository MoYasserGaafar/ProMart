import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  wishlistCounter: BehaviorSubject<number> = new BehaviorSubject(0)

  headers = { token: localStorage.getItem('token')! }

  constructor(private _HttpClient: HttpClient) { }

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