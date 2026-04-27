import { API } from "../../store/utils"

export const fetchCategoryAPI = async () => {
    const res = await API.get("/categories");
    const data = res.data;
    return data;
}