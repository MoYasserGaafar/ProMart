import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';

@Injectable({
  //Decorator indicates that this class can be injected into other components or services.
  providedIn: 'root'
  //Specifies that a single instance of this service will be created for the entire application and accessible from any component or service.
})

export class ProductsService {
  
  constructor(private _HttpClient: HttpClient) { }
  //<constructor>: class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.

  getProducts = (): Observable<any> => {
  //Function will return an observable that emits data of any type.

    //this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
    return this._HttpClient.get(baseUrl + 'api/v1/products');
    //Fetch products data using the injected <_HttpClient> service.
    //Makes a GET request to the specified URL to retrieve product data.
    //Statement returns the observable that will eventually emit the data received from the API call returned by the <_HttpClient.get> method.
  }

  getProduct = (id: string): Observable<any> => {
      return this._HttpClient.get(baseUrl + `api/v1/products/${id}`);
  }
}