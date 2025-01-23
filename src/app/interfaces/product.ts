export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
    manufacturer: string;
    supplier: string;
    weight: string;
    total_price?: number
}