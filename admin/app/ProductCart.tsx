// ProductCard.tsx
import { useCart } from "./CartContext";
import { Product } from "./types";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  return <button onClick={() => addToCart(product)}>Add to Cart</button>;
};
