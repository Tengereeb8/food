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
  name: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export const GetCategories = async () => {
  const response = await fetch("http://localhost:3001/categories", {
    cache: "no-store",
  });

  const data: GetCategoriesResponse = await response.json();

  return (
    <div className="flex flex-wrap gap-3">
      {data.categories?.map((category: any) => (
        <Badge
          key={category.id}
          className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black hover:bg-gray-50 transition-colors"
        >
          {category.categoryName}
        </Badge>
      ))}
    </div>
  );
};
