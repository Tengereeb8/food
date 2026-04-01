// App.tsx
import { CartProvider } from "./CartContext";

const App = () => (
  <CartProvider>
    <ProductList />
  </CartProvider>
);
