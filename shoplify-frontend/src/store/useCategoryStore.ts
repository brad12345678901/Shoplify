import { create } from "zustand";
import type { Category } from "../types/category";

interface CategoryStore {
    categories: Category[],
    loading: boolean,
    submit_loading: boolean,
    setCategories: (category: Category[]) => void,
    setLoading: (loading: boolean) => void,
    setSubmitLoading: (submit_loading: boolean) => void,
}

const initialState = {
    categories: [],
    loading: false,
    submit_loading: false,
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categories: initialState.categories,
    loading: initialState.loading,
    submit_loading: initialState.submit_loading,
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setSubmitLoading: (submit_loading) => set({ submit_loading }),
}))