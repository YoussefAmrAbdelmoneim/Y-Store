import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }
  getProducts():Observable<any>
  {
    return this.httpClient.get(`${baseUrl.url}/products`)
  }
    getFeaturedProducts():Observable<any>
  {
    return this.httpClient.get(`${baseUrl.url}/products?limit=6`)
  }
    getSingleProduct(id:string):Observable<any>
  {
    return this.httpClient.get(`${baseUrl.url}/products/${id}`)
  }
}
