export interface ProductRequest {
    first: number,
    rows: number,
    sortField: string | string[],
    sortOrder: number,
    category: string | null, 
    supplier: string | null, 
    manufacturer: string | null, 
    searchText: string | null
}
