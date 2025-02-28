import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../enviroment/enviroment.local';

@Injectable({
  providedIn: 'root'
})

export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }
  //<constructor>: class called when a new instance of the service is created.
  //Injects the HttpClient service from Angular's module. 
  //Injected instance is stored in a private property for internal use.

  getBrands = (): Observable<any> => {
  //Function will return an observable that emits data of any type.
      
  return this._HttpClient.get(baseUrl + 'api/v1/brands');
    //Fetch categories data using the injected _HttpClient service.
    //Makes a GET request to the specified URL to retrieve product data.
    //Statement returns the observable that will eventually emit the data received from the API call returned by the <_HttpClient.get> method.
  }
}