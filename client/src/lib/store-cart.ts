import { create } from "zustand";
import { persist } from "zustand/middleware";
import { convertProductToCartItem } from "./utils";

type State = {
  cartItems: General.CartItem[]; // Array dari CartItem
};

type Action = {
  increaseCartItem: (id: string) => void; // Fungsi untuk menambah jumlah produk berdasarkan id
  decreaseCartItem: (id: string) => void; // Fungsi untuk menambah jumlah produk berdasarkan id
  removeCartItem: (id: string) => void; // Fungsi untuk menambah jumlah produk berdasarkan id
  addToCart: (item: Product.ProductAttributes) => void; // Fungsi untuk menambah item ke keranjang
};

type CartStore = State & Action;

export const useCartStore = create<CartStore>(
  //@ts-expect-error : "Entah kenapa"
  persist<CartStore>(
    (set) => ({
      cartItems: [],

      // Menambah jumlah produk di keranjang berdasarkan id
      increaseCartItem: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 } // Tambah jumlah produk
              : item
          );
          return { cartItems: updatedCartItems };
        }),

      // Menurunkan jumlah produk di keranjang berdasarkan id
      decreaseCartItem: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems
            .map((item) =>
              item.id === id && item.quantity >= 1
                ? { ...item, quantity: item.quantity - 1 } // Kurangi jumlah produk
                : item
            )
            .filter((item) => item.quantity > 0); // Hapus item jika quantity = 0

          return { cartItems: updatedCartItems };
        }),

      removeCartItem: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== id
          );

          return { cartItems: updatedCartItems };
        }),

      // Menambahkan item baru ke dalam keranjang
      addToCart: (item) =>
        set((state) => ({
          cartItems: [...state.cartItems, convertProductToCartItem(item)],
        })),
    }),
    { name: "Cart-Store" }
  )
);