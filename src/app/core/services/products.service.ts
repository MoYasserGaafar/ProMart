import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../enviroment/enviroment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  
  constructor(private _HttpClient: HttpClient) { }

  getProducts = (): Observable<any> => {

    //this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
    return this._HttpClient.get(baseUrl + 'api/v1/products');
  }

  getProduct = (id: string): Observable<any> => {
      return this._HttpClient.get(baseUrl + `api/v1/products/${id}`);
  }
}