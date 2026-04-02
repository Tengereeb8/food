// "use client"; // This makes the component a Client Component

// import { useState, useEffect, useContext } from "react";
// import { PlusIcon } from "lucide-react"; // Import the Plus icon
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// // Assuming you have a Dialog component in your UI folder
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { CartContext } from "../contexts/CartContext";

// interface Food {
//   id: number;
//   foodName: string;
//   price: number;
//   ingredients: string;
// }

// interface Category {
//   id: number;
//   categoryName: string;
//   foods: Food[];
// }

// export const FoodCart = () => {
//   const { card } = useContext(CartContext);
//   console.log(card);

//   const [categoryData, setCategoryData] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/categories");
//         const data = await response.json();
//         setCategoryData(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-10 text-white">Loading menu...</div>;

//   const onAdd = () => {
//     addCart(food, quantity);
//   };

//   return (
//     <div className="p-10 font-inter">
//       {categoryData.map((category) => (
//         <div key={category.id} className="mb-10">
//           <h2 className="text-xl font-semibold mb-4 text-white">
//             {category.categoryName}
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {category.foods.map((food) => (
//               <Card
//                 key={food.id}
//                 className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden"
//               >
//                 <div className="relative p-4">
//                   <img
//                     src="https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger.jpg"
//                     alt={food.foodName}
//                     className="w-full h-52.5 object-cover rounded-xl"
//                   />

//                   <Sheet>
//                     <SheetTrigger asChild>
//                       <button
//                         onClick={}
//                         className="absolute bottom-16 right-8 bg-white p-2 rounded-full shadow-lg w-10 h-10 flex justify-center items-center hover:bg-gray-100 transition-all active:scale-95 cursor-pointer z-40"
//                       >
//                         <PlusIcon className="text-red-500 w-6 h-6" />
//                       </button>
//                     </SheetTrigger>
//                     <SheetContent>
//                       <SheetHeader>
//                         <SheetTitle>Card</SheetTitle>
//                       </SheetHeader>
//                       <div>
//                         {card.map((card, index) => {
//                           return (
//                             <div key={index}>
//                               <h1>{card.food.name}</h1>
//                             </div>
//                           );
//                         })}
//                       </div>
//                       <SheetFooter>
//                         <SheetClose asChild>
//                           <Button variant="outline">Close</Button>
//                         </SheetClose>
//                       </SheetFooter>
//                     </SheetContent>
//                   </Sheet>
//                 </div>

//                 <CardHeader className="pt-0">
//                   <CardTitle className="flex justify-between items-center">
//                     <span className="text-[#ef4444] text-2xl font-semibold">
//                       {food.foodName}
//                     </span>
//                     <span className="font-semibold text-lg">${food.price}</span>
//                   </CardTitle>
//                   <CardDescription>{food.ingredients}</CardDescription>
//                 </CardHeader>
//               </Card>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
"use client";

import { useState, useEffect, useContext } from "react";
import { PlusIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CartContext } from "../contexts/CartContext";

interface Food {
  id: number;
  foodName: string;
  price: number;
  ingredients: string;
}

interface Category {
  id: number;
  categoryName: string;
  foods: Food[];
}

export const FoodCart = () => {
  // Get addCard from your context
  const { addCard } = useContext(CartContext);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/categories");
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-white">Loading menu...</div>;

  return (
    <div className="p-10 font-inter">
      {categoryData.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {category.categoryName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.foods.map((food) => (
              <Card
                key={food.id}
                className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden"
              >
                <div className="relative p-4">
                  <img
                    src="https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger.jpg"
                    alt={food.foodName}
                    className="w-full h-40 object-cover rounded-xl"
                  />

                  <Dialog>
                    <DialogTrigger>
                      <button
                        onClick={() => addCard(food, 1)}
                        className="absolute bottom-8 right-8 bg-white p-2 rounded-full shadow-lg w-10 h-10 flex justify-center items-center hover:bg-gray-100 transition-all active:scale-95 cursor-pointer z-40"
                      >
                        <PlusIcon className="text-red-500 w-6 h-6" />
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-106.25">
                      <DialogHeader>
                        <DialogTitle>{food.foodName}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <img
                          src="https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger.jpg"
                          alt={food.foodName}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <p className="text-sm text-gray-500">
                          {food.ingredients}
                        </p>
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total</span>
                          <span className="text-red-500">${food.price}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <CardHeader className="pt-0">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-[#ef4444] text-2xl font-semibold">
                      {food.foodName}
                    </span>
                    <span className="font-semibold text-lg">${food.price}</span>
                  </CardTitle>
                  <CardDescription>{food.ingredients}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
