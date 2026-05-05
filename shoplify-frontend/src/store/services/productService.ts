import { API } from "../../store/utils"

export const fetchProductsApi = async () => {
    const res = await API.get("/products")
    const data = res.data;
    return data;
}

export const fetchProductApi = async (id: number) => {
    const res = await API.get(`/products/${id}`);
    const data = res.data;
    return data;
}

export const addProductsApi = async (formData: FormData) => {
    const res = await API.post("/products", formData, { headers: { "Content-Type": "multipart/form-data" } });
    const data = res.data;
    return data;
}