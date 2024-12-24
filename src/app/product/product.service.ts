import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { Product } from './product';
import { ProductRequest } from '../interfaces/product-request';
import { PaginationApiResponse } from '../interfaces/pagination-api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  getAllProducts(request: ProductRequest): Observable<PaginationApiResponse>{

    const { first, rows} = request;

    const page = (first / rows) + 1;

    const pageDetails = `page=${page}&limit=${rows}`

    return this.http.get<PaginationApiResponse>(`${this.baseUrl}/api/v1/product/all?${pageDetails}`);
  }

  deleteProduct(productId: number): Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`${this.baseUrl}/api/v1/product/${productId}`);
  }

  updateProduct(product: Product): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl}/api/v1/product/${product.id}`, product);
  }

  addProduct(product: Product): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl}/api/v1/product`, product);
  }

  searchProduct(category: string): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/api/v1/product/category/${category}`);
  }

  getCategories(): Observable<string[]>{
    return this.http.get<string[]>(`https://fakestoreapi.com/products/categories`);
  }

  getProductsByCategory(category: string | null): Observable<ApiResponse> {
    const params = new HttpParams().set('category', category || '');
    return this.http.get<ApiResponse>(`${this.baseUrl}/api/v1/product/by-category`, { params });
  }
  

}
