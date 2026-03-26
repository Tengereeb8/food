import { AddFoodCart } from "../Food-Menu/components/addFoodCart";
import { AdminFoodCart } from "../Food-Menu/components/admin-card";

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface Category {
  id: number;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
}

export interface Food {
  id: number;
  image: string;
  foodName: string;
  ingredients: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export const AdminFood = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3001/categories", {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Backend response not OK");

    const data = await response.json();
    const categoriesArray = Array.isArray(data) ? data : data.categories;

    return (
      <div className="p-6 space-y-8">
        {categoriesArray.map((category: Category) => (
          <div
            key={category.id}
            className="bg-white w-full max-w-5xl p-5 rounded-xl shadow-sm"
          >
            <h1 className="text-xl font-bold pb-4 border-b mb-4">
              {category.categoryName}
            </h1>

            <div className="flex flex-wrap gap-4">
              <AddFoodCart categoryId={category.id} />

              {category.foods?.map((food: Food) => (
                <AdminFoodCart key={food.id} food={food} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="p-10 text-red-500">Failed to load admin menu.</div>;
  }
};
