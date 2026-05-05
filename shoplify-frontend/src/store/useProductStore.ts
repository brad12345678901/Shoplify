import { create } from "zustand";
import type { Product } from "../types/products";
import type { ProductForm } from "../types/ProductForm";

interface ProductStore {
    products: Product[],
    product: Product | null,
    productsForm: ProductForm,
    loading: boolean,
    submit_loading: boolean,
    setProducts: (products: Product[]) => void,
    setProduct: (product: Product) => void,
    setProductsForm: (name: string, value: any) => void,
    setLoading: (loading: boolean) => void,
    setSubmitLoading: (submit_loading: boolean) => void,
    resetProductsForm: () => void,
}

const initialState = {
    products: [],
    product: null,
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
    product: initialState.product,
    productsForm: initialState.productForm,
    loading: false,
    submit_loading: false,
    setProducts: (products) => set({ products }),
    setProduct: (product) => set({product}),
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