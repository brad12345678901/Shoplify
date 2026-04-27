export type ProductForm = {
    name: string,
    type: string,
    category: number | undefined,
    description: string,
    price: number,
    stock: number,
    file: File | undefined,
}