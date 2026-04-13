import type { Category } from "./category"

export interface Products {
    Id: number,
    Name: string,
    Type: string,
    CategoryId: number,
    Category?: Category,
    Description: string,
    Price: number,
    Stock: number
    Created_At: string,
    Updated_At: string
}