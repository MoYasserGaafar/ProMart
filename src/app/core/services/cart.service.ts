import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0)

  headers = { token: localStorage.getItem('token')! }

  constructor(private _HttpClient: HttpClient) { }

  addProductToCart = (productId: string): Observable<any> => {

    //this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
    return this._HttpClient.post(baseUrl + 'api/v1/cart', { productId: productId }, {
      headers: { ...this.headers }
    })
  }

  updateProductQuantity = (productId: string, count: number): Observable<any> => {
      return this._HttpClient.put(`${baseUrl}api/v1/cart/${productId}`, { count }, {
        headers: { ...this.headers }
      })
  }

  removeItemFromCart = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart/' + productId, {
      headers: { ...this.headers }
    })
  }

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart/', {
      headers: { ...this.headers }
    })
  }

  getLoggedUserCart = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/cart/', {
      headers: { ...this.headers }
    })
  }
}