import { fetchCategoryAPI } from "../services/categoryService"
import { useCategoryStore } from "../useCategoryStore"

export const useCategory = () => {
    const setCategories = useCategoryStore((state) => state.setCategories);
    const setLoading = useCategoryStore((state) => state.setLoading);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await fetchCategoryAPI()
            setCategories(data.data);
            setLoading(false);
            return { success: data.success, message: data.message }
        }
        catch (error) {
            console.error("ERROR: ", error);
            setLoading(false);
            return { success: false, message: "Something is Wrong" }
        }
    }

    return { setCategories, fetchCategories, setLoading }
}