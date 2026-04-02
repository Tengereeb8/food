// "use client";

// import { createContext, ReactNode, useState } from "react";
// import { Food } from "../../../../admin/app/food-menu/components/category/getCategory";
// type CartContextProvider = {
//   children: ReactNode;
// };

// type CartContextType = {
//   card: Food[];
//   addCard: (food: Food, quantity: number) => void;
// };

// type FoodCart = {
//   food: Food;
//   quantity: number;
// };

// export const CartContext = createContext({});

// export const CartContextProvider = (props: CartContextProvider) => {
//   const { children } = props;

//   const [card, setCard] = useState<FoodCart[]>([]);

//   const addCard = (food: Food, quantity: number) => {
//     const newCard = [...card, { food, quantity }];

//     setCard(newCard);
//   };

//   const value = {
//     card,
//     addCard,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

"use client";
import { createContext, ReactNode, useState } from "react";

type CartContextProvider = {
  children: ReactNode;
};

type CartContextType = {
  card: FoodCart[];
  addCard: (food: Food, quantity: number) => void;
};

type FoodCart = {
  food: Food;
  quantity: number;
};

export type Food = {
  id: number;
  foodName: string;
  price: number;
  ingredients: string;
};

export const CartContext = createContext<CartContextType>({
  card: [],
  addCard: () => {},
});

export const CartContextProvider = ({ children }: CartContextProvider) => {
  const [card, setCard] = useState<FoodCart[]>([]);

  const addCard = (food: Food, quantity: number) => {
    const newCard = [...card, { food, quantity }];
    setCard(newCard);
  };

  return (
    <CartContext.Provider value={{ card, addCard }}>
      {children}
    </CartContext.Provider>
  );
};
