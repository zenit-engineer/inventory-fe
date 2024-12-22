import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAllProductsApiResponse } from '../interfaces/get-all-products-api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  configUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<getAllProductsApiResponse>{
    return this.http.get<getAllProductsApiResponse>(`${this.configUrl}/api/v1/product/all`);
  }

  deleteProduct(productId: number): Observable<any>{
    return this.http.delete<Observable<any>>(`${this.configUrl}/api/v1/product/${productId}`);
  }

  addEditProduct(postData: any, selectedProduct: any) {
    if(!selectedProduct){
      return this.http.post('http://localhost:8080/api/v1/product', postData);
    } else {
      return this.http.put(`http://localhost:8080/api/v1/product/${selectedProduct.id}`, postData);
    }
    
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`);
  }

}
