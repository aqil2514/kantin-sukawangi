import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ValueState = "checkout" | "continue";

interface CartProviderProps {
  value: ValueState;
  setValue: React.Dispatch<SetStateAction<ValueState>>;
  items: General.CartItem[];
  setItems: React.Dispatch<SetStateAction<General.CartItem[]>>;
  data: Page.Cart;
}

const CartContext = createContext<CartProviderProps>({} as CartProviderProps);

export default function CartProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Page.Cart;
}) {
  const [value, setValue] = useState<ValueState>("checkout");
  const [items, setItems] = useState<General.CartItem[]>([]);

  const contextValue: CartProviderProps = {
    setValue,
    value,
    items,
    setItems,
    data,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
