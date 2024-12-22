import { Product } from "../product/product";

export interface ApiResponse {
    status: string;
    message: string;
    data: Product[];
    errors: []
  }
  