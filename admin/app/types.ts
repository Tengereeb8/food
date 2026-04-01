// types.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  // Add other fields like image, quantity, etc., as needed
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  // You might add removeFromCart, clearCart, etc.
}
