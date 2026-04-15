import { fetchProductsApi } from "../services/productService"
import { useProductStore } from "../store/useProductStore"

export const useProducts = () => {
    const products = useProductStore((state) => state.products)
    const productsForm = useProductStore((state) => state.productsForm)
    const loading = useProductStore((state) => state.loading)
    const submit_loading = useProductStore((state) => state.submit_loading)
    const setProducts = useProductStore((state) => state.setProducts)
    const setProductsForm = useProductStore((state) => state.setProductsForm)

    const fetchProducts = async () => {
        try {
            const data = await fetchProductsApi()
            setProducts(data.data);
            return { success: data.success, message: data.message }
        }
        catch (error) {
            console.error("ERROR: ", error);
            return { success: false, message: "Something is Wrong" }
        }
    }

    return { products, productsForm, loading, submit_loading, fetchProducts, setProductsForm }
}