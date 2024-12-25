export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RatingProps;
    manufacturer: string;
    supplier: string;
    weight: string;
}

interface RatingProps{
    rate: number;
    count:number;
}