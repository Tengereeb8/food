import { Badge } from "@/components/ui/badge";

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  foods: Food[];
}

export interface Food {
  id: number;
  image: string;
  ingredients: string;
  foodName: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export const GetCategories = async () => {
  try {
    const response = await fetch("http://127.0.0.1:3001/categories", {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Backend response not OK");

    const data = await response.json();

    const categoriesArray = Array.isArray(data) ? data : data.categories;

    return (
      <div className="flex flex-wrap gap-3">
        {categoriesArray?.map((category: any) => (
          <Badge
            key={category.id}
            variant="outline"
            className="px-4 py-2 h-9 text-sm border-[#e4e4e7] bg-white text-black flex gap-2 items-center"
          >
            <span className="font-medium">
              {category.categoryName || category.name}
            </span>

            <span className="text-white text-xs bg-black px-1.5 py-0.5 rounded-full">
              {category.foods?.length || 0}
            </span>
          </Badge>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Fetch failed:", error);
  }
};
