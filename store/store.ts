import {create} from "zustand";
import {Product} from "@prisma/client";
import {createJSONStorage, persist} from "zustand/middleware";
import toast from "react-hot-toast";

interface IStore {
    cart: Product[],
    handleAddItemToCart: (product: Product) => void
    removeItem: (id: string) => void,
    removeAll: () => void
}

export const useStore = create(
    persist<IStore>((set, get) => ({
        cart: [],
        handleAddItemToCart: (data: Product) => {
            const currentItems = get().cart;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast('Item already in cart.');
            }

            set({cart: [...get().cart, data]});
            toast.success('Item added to cart.');
        },
        removeItem: (id: string) => {
            set({cart: [...get().cart.filter((cart) => cart.id !== id)]});
            toast.success('Item removed from cart.');
        },
        removeAll: () => set({cart: []}),
    }), {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage)
    }));