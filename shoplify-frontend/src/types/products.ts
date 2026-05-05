import type { Category } from "./category"

export interface Product {
    id: number,
    name: string,
    type: string,
    categoryid: number,
    category?: Category,
    description: string,
    price: number,
    stock: number
    created_at: string,
    updated_at: string
    imageUrl : string[],
}