import type { Category } from "./category"

export type categoryResponse = {
    successs: boolean,
    message: string,
    data: Category[],
}