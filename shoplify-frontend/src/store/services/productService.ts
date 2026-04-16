import { API } from "../../store/utils"

export const fetchProductsApi = async () => {
    const res = await API.get("/products")
    const data = res.data;
    return data;
}