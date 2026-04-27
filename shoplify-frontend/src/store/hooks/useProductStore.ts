import { addProductsApi, fetchProductsApi } from "../services/productService"
import { useProductStore } from "../../store/useProductStore"

export const useProducts = () => {
    const setProducts = useProductStore((state) => state.setProducts)
    const setProductsForm = useProductStore((state) => state.setProductsForm)
    const setLoading = useProductStore((state) => state.setLoading)
    const setSubmitLoading = useProductStore((state) => state.setSubmitLoading)
    const resetProductsForm = useProductStore((state) => state.resetProductsForm)

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProductsApi()
            setProducts(data.data);
            setLoading(false);
            return { success: data.success, message: data.message }
        }
        catch (error) {
            console.error("ERROR: ", error);
            setLoading(false);
            return { success: false, message: "Something is Wrong" }
        }
    }

    const addProducts = async (formData: FormData) => {
        try {
            setSubmitLoading(true);
            const data = await addProductsApi(formData);
            return { success: data.success, message: data.message }
        } catch (error) {
            console.error("ERROR: ", error);
            setSubmitLoading(false);
            return { success: false, message: "Something is Wrong" }
        }
    }

    return { fetchProducts, setProductsForm, resetProductsForm, addProducts }
}