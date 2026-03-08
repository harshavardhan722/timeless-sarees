import React, { createContext, useContext, useState, ReactNode } from "react";
import { Saree } from "@/hooks/useSarees";

export interface CartItem {
  saree: Saree;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (saree: Saree) => void;
  removeFromCart: (sareeId: string) => void;
  updateQuantity: (sareeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (saree: Saree) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.saree.id === saree.id);
      if (existing) {
        return prev.map((item) =>
          item.saree.id === saree.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { saree, quantity: 1 }];
    });
  };

  const removeFromCart = (sareeId: string) => {
    setItems((prev) => prev.filter((item) => item.saree.id !== sareeId));
  };

  const updateQuantity = (sareeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sareeId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.saree.id === sareeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.saree.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
