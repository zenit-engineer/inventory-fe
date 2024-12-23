import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  configUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.configUrl}/api/v1/product/all`);
  }

  deleteProduct(productId: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.configUrl}/api/v1/product/${productId}`);
  }

  updateProduct(product: Product): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.configUrl}/api/v1/product/${product.id}`, product);
  }

  addProduct(product: Product): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.configUrl}/api/v1/product`, product);
  }

  searchProduct(category: string): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.configUrl}/api/v1/product/category/${category}`);
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`);
  }

  getProductsByCategory(category: string | null): Observable<ApiResponse> {
    const params = new HttpParams().set('category', category || '');
    return this.http.get<ApiResponse>(`${this.configUrl}/api/v1/product/by-category`, { params });
  }
  

}
