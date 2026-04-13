import { fetchProductsApi } from "../services/productService"
import { useProductStore } from "../store/useProductStore"

export const useProducts = () => {
    const products = useProductStore((state) => state.products)
    const setProducts = useProductStore((state) => state.setProducts)

    const fetchProducts = async () => {
        const data = await fetchProductsApi()
        setProducts(data);
    }

    return {products, fetchProducts}
}