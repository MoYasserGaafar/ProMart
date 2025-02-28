import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  //cartCounter: number = 0
  //Declares a public property named <cartCounter> and initializes it with the value <0>. It is used to track the number of items currently in the shopping cart.

  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  //Declares a public property named <cartCounter> and types it as a <BehaviorSubject<number>>. So <cartCounter> is an Observable that can emit values of type number.
  //<= new BehaviorSubject(0)>: Initializes the <cartCounter> BehaviorSubject with an initial value of 0. This initial value will be emitted to any observer that subscribes to the <cartCounter> Observable.
  //Defines a <BehaviorSubject> to manage the number of items in the cart. 

  headers = { token: localStorage.getItem('token')! }
  //Defines a property that holds an object containing an authorization token retrieved from local storage. 
  //<!>: Asserts that <localStorage.getItem('token')> will not be null.

  constructor(private _HttpClient: HttpClient) { }
  //<constructor>: Class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.

  addProductToCart = (productId: string): Observable<any> => {
  //Function will return an observable that emits data of any type.

    //this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
    return this._HttpClient.post(baseUrl + 'api/v1/cart', { productId: productId }, {
    //<this._HttpClient.post>: Make a POST request to the API endpoint.
    //<{ productId: productId }>: Object containing the product data to be sent in the request body. It has a single property named <productId> set to the provided <productId> argument.
      headers: { ...this.headers }
      //<{ headers: { ...this.headers } }>: Object containing headers for the request. It uses the spread operator <...> to copy the properties from the <this.headers> property, that contains authorization tokens or other headers, into a new object for the request.
    })
  }

  updateProductQuantity = (productId: string, count: number): Observable<any> => {
      return this._HttpClient.put(`${baseUrl}api/v1/cart/${productId}`, { count }, {
        headers: { ...this.headers }
      })
  }
  //Method takes a <productId> and a <count> as an input and returns an Observable. 
  //It makes a PUT request to the </api/v1/cart/:productId> endpoint, where <productId> is replaced with the actual <product ID> with the updated quantity in the request body and the authorization headers.

  removeItemFromCart = (productId: string): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart/' + productId, {
      headers: { ...this.headers }
    })
  }
  //Method takes a <productId> as an input and returns an Observable. 
  //It makes a DELETE request to the </api/v1/cart/:productId> endpoint to remove the item from the cart and includes the authorization headers.

  clearCart = (): Observable<any> => {
    return this._HttpClient.delete(baseUrl + 'api/v1/cart/', {
      headers: { ...this.headers }
    })
  }
  //Method returns an Observable. 
  //It makes a DELETE request to the </api/v1/cart> endpoint to clear the entire cart and includes the authorization headers.

  getLoggedUserCart = (): Observable<any> => {
    return this._HttpClient.get(baseUrl + 'api/v1/cart/', {
      headers: { ...this.headers }
    })
  }
  //Method returns an Observable. 
  //It makes a GET request to the </api/v1/cart> endpoint to retrieve the logged user's cart data and includes the authorization headers.
}