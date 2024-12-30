import { Product } from "./product";

export interface ApiResponse {
    status: string;
    message: string;
    data: Product[];
    errors: []
  }
  