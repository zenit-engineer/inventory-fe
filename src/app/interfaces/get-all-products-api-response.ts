import { Product } from "../product/product";

export interface getAllProductsApiResponse {
    status: string;
    message: string;
    data: Product[];
    errors: []
  }
  