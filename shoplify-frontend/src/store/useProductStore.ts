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
    resetProductsForm: () => void,
}

const initialState = {
    products: [],
    productForm: {
        name: "",
        type: "",
        categoryid: 0,
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
    }))
}))