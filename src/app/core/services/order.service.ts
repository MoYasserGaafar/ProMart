import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  headers = { token: localStorage.getItem('token')! }
  constructor(private _HttpClient: HttpClient) { }

  checkoutSession = (cartId: string, shippingAddress: object): Observable<any> => {

    return this._HttpClient.post(baseUrl + 'api/v1/orders/checkout-session/'+ cartId + "?url=http://localhost:4200", { shippingAddress }, {
      headers: {
        token: localStorage.getItem('token')!
      }
    })
  }

  getAllOrders = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/orders/', {
      headers: { ...this.headers }
    })
  }

  getUserOrders = (): Observable<any> => {
    //"id": "66db01c5d6a95f154e1f17c5"
    return this._HttpClient.get(baseUrl + 'api/v1/orders/user/66db01c5d6a95f154e1f17c5', {
      headers: { ...this.headers }
    })
  }
}