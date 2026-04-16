export type ProductForm = {
    name: string,
    type: string,
    categoryid: number,
    description: string,
    price: number,
    stock: number,
    file: File | undefined,
}