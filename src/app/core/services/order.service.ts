import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  headers = { token: localStorage.getItem('token')! }
  //Defines a property that holds an object containing an authorization token retrieved from local storage. 
  //<!>: Asserts that <localStorage.getItem('token')> will not be null.

  constructor(private _HttpClient: HttpClient) { }
  //<constructor>: class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.

  checkoutSession = (cartId: string, shippingAddress: object): Observable<any> => {
  //Function will return an observable that emits data of any type.

    //this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
    return this._HttpClient.post(baseUrl + 'api/v1/orders/checkout-session/'+ cartId + "?url=http://localhost:4200", { shippingAddress }, {
    //Uses the injected <_HttpClient> service to make a POST request and constructs the URL for the API endpoint.
    //<"?url=http://localhost:4200">: Appends a query parameter to the URL for success and cancel URL.
    //<{ shippingAddress }>: Object represents the actual data being sent to the server.
      headers: {
        token: localStorage.getItem('token')!
        //Sets the request headers, including an authorization header with a token retrieved from <localStorage>.
        //<!>: Non-null assertion, indicating confidence that the token exists in local storage.
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