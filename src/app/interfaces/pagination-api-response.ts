import { Product } from "./product";

export interface PaginationApiResponse {
    status: string;
    message: string;
    data: {
        products: Product[];
        totalElements: number;
    };
    errors: [];
}
