import type { Products } from "./products"

export type productResponse = {
    successs: boolean,
    message: string,
    data: Products[],
}