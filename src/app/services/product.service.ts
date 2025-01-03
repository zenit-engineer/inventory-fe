import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { ProductRequest } from '../interfaces/product-request';
import { PaginationApiResponse } from '../interfaces/pagination-api-response';
import { ApiResponseWithDataListOfStrings } from '../interfaces/api-response-with-data-list-of-strings';
import { Manufacturer } from '../interfaces/manufacturer';
import { Category } from '../interfaces/category';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  getAllProducts(request: ProductRequest): Observable<PaginationApiResponse>{

    const { first, rows, sortField, sortOrder, category, supplier, manufacturer, searchText} = request;

    const page = (first / rows) + 1;

    let params = `page=${page}&limit=${rows}`

    if(sortField){
      params += `&sort=${sortField}&order=${sortOrder ===1 ? 'asc' : 'desc'}`;
    }

    if(category){
      params += `&category=${category}`;
    }

    if(supplier){
      params += `&supplier=${supplier}`;
    }

    if(manufacturer){
      params += `&manufacturer=${manufacturer}`;
    }

    if(searchText){
      params += `&searchText=${searchText}`;
    }

    return this.http.get<PaginationApiResponse>(`${this.baseUrl}/api/v1/product/all?${params}`);
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

  getAllCategories(): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.get<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/category/all`);
  }

  getAllSuppliers(): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.get<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/supplier/all`);
  }

  getAllManufacturers(): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.get<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/manufacturer/all`);
  }

  addNewManufacturer(manufacturer: Manufacturer): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.post<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/manufacturer`, manufacturer);
  }

  addNewSupplier(supplier: Supplier): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.post<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/supplier`, supplier);
  }

  addNewCategory(category: Category): Observable<ApiResponseWithDataListOfStrings>{
    return this.http.post<ApiResponseWithDataListOfStrings>(`${this.baseUrl}/api/v1/category`, category);
  }

  generateExcel(): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/api/v1/product/export-excel`, { responseType: 'text' as 'json' });
  }
  
  importExcel(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/v1/product/import-excel`, formData);
  }  
  
}
