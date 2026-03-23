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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const FoodCart = async () => {
  const response = await fetch("http://localhost:3001/categories", {
    cache: "no-store",
  });

  const categoryData: Category[] = await response.json();

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
                className="relative mx-auto w-full max-w-sm pt-0"
              >
                <div className="absolute inset-0 z-30 aspect-video " />

                <img
                  src="https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger.jpg"
                  alt={food.foodName}
                  className="relative z-20 aspect-video w-full object-cover "
                />

                <CardHeader>
                  <CardAction></CardAction>

                  <CardTitle className="flex justify-between items-center">
                    <span className="text-[#ef4444] text-2xl font-semibold font-inter">
                      {food.foodName}
                    </span>
                    <span className="font-semibold text-lg font-inter">
                      ${food.price}
                    </span>
                  </CardTitle>

                  <CardDescription>{food.ingredients}</CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-col gap-2"></CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
