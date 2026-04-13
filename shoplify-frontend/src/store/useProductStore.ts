import { create } from "zustand";
import type { Products } from "../types/products";

interface ProductStore {
    products: Products | null,
    setProducts: (products: Products) => void,
}

export const useProductStore = create<ProductStore>((set) => ({
    products: null,
    setProducts: (products) => set({ products }),
}))