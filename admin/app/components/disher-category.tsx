import { Badge } from "@/components/ui/badge";
import { CirclePlusIcon, Plus } from "lucide-react";

export const Category = () => {
  return (
    <div className="bg-white p-6 rounded-xl w-fit">
      <h1 className="pb-4">Dishes category</h1>
      <div className=" flex gap-3 items-center">
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black ">
          All Dishes
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          Apetizers
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          Salads
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          Pizzas
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          Lunch favorites
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          Main dishes
        </Badge>
        <Badge className="px-4 py-2 h-9 text-sm border border-[#e4e4e7] bg-white text-black">
          {" "}
          Fish & Sea foods
        </Badge>
        <div className="size-9 bg-red-500 rounded-full flex items-center justify-center">
          <Plus className="w-4 h-4 text-white " />
        </div>
      </div>
    </div>
  );
};
