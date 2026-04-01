"use client";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { AddFoodCart } from "../addFoodCart";
import { AdminFoodCart } from "./admin-card";
import { AddCategory } from "./addCategory";
// import { AdminFoodCart } from "../admin-card";

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
  ingredients: string;
  foodName: string;
  price: string;
  foodCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export const GetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const fetchCategories = () => {
    fetch("http://127.0.0.1:3001/categories", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.categories;
        setCategories(arr);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const totalFoods = categories.reduce(
    (acc, cat) => acc + (cat.foods?.length ?? 0),
    0,
  );
  const visibleCategories =
    selectedId === null
      ? categories
      : categories.filter((cat) => cat.id === selectedId);

  return (
    <div className="flex flex-col gap-6 w-292.75">
      <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Dishes Category</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <Badge
            onClick={() => setSelectedId(null)}
            variant="outline"
            className={`px-4 py-2 h-9 text-sm flex gap-2 items-center cursor-pointer transition-colors ${
              selectedId === null
                ? "bg-black text-white border-black"
                : "bg-white text-black border-[#e4e4e7]"
            }`}
          >
            <span className="font-medium">All Dishes</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                selectedId === null
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
            >
              {totalFoods}
            </span>
          </Badge>

          {categories.map((category) => (
            <Badge
              key={category.id}
              onClick={() => setSelectedId(category.id)}
              variant="outline"
              className={`px-4 py-2 h-9 text-sm flex gap-2 items-center cursor-pointer transition-colors ${
                selectedId === category.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-[#e4e4e7]"
              }`}
            >
              <span className="font-medium">{category.categoryName}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  selectedId === category.id
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }`}
              >
                {category.foods?.length}
              </span>
            </Badge>
          ))}
          <AddCategory />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white w-full p-6 rounded-xl shadow-sm"
          >
            <h1 className="text-xl font-bold pb-4 border-b mb-4">
              {category.categoryName} ({category.foods?.length})
            </h1>
            <div className="flex flex-wrap gap-4">
              <AddFoodCart categoryId={category.id} refetch={fetchCategories} />{" "}
              {category.foods.map((food) => (
                <AdminFoodCart
                  key={food.id}
                  food={food}
                  categories={categories}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
