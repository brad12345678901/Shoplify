import { create } from "zustand";
import type { Products } from "../types/products";
import type { ProductForm } from "../types/ProductForm";

interface ProductStore {
    products: Products[],
    productsForm: ProductForm,
    loading: boolean,
    submit_loading: boolean,
    setProducts: (products: Products[]) => void,
    setProductsForm: (name: string, value: any) => void,
    setLoading: (loading: boolean) => void,
    setSubmitLoading: (submit_loading: boolean) => void,
    resetProductsForm: () => void,
}

const initialState = {
    products: [],
    productForm: {
        name: "",
        type: "",
        category: undefined,
        description: "",
        price: 0,
        stock: 0,
        file: undefined,
    }
}

export const useProductStore = create<ProductStore>((set) => ({
    products: initialState.products,
    productsForm: initialState.productForm,
    loading: false,
    submit_loading: false,
    setProducts: (products) => set({ products }),
    setProductsForm: (name, value) => set((state) => ({
        productsForm: {
            ...state.productsForm,
            [name]: value,
        }
    })),
    resetProductsForm: () => set(() => ({
        productsForm: initialState.productForm
    })),
    setLoading: (loading: boolean) => set({ loading }),
    setSubmitLoading: (submit_loading: boolean) => set({ submit_loading }),
}))