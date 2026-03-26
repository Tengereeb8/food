// This should be a Server Component (No "use client" here)
import { AddCategory } from "./category/addCategory";
import { GetCategories } from "./category/getCategory";
import { Suspense } from "react";

export const Category = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Dishes Category</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <GetCategories />

        <AddCategory />
      </div>
    </div>
  );
};
