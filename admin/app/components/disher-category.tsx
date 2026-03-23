import { Badge } from "@/components/ui/badge";
import { CirclePlusIcon } from "lucide-react";

export const Category = () => {
  return (
    <div className="bg-white p-6">
      <h1>Dishes category</h1>
      <Badge className="px-4 py-2 bg-white text-black">All Dishes</Badge>
      <Badge className="px-4 py-2 bg-white text-black">Apetizers</Badge>
      <Badge className="px-4 py-2 bg-white text-black">Salads</Badge>
      <Badge className="px-4 py-2 bg-white text-black">Pizzas</Badge>
      <Badge className="px-4 py-2 bg-white text-black">Lunch favorites</Badge>
      <Badge className="px-4 py-2 bg-white text-black">Main dishes</Badge>
      <Badge className="px-4 py-2 bg-white text-black"> Fish & Sea foods</Badge>
      <CirclePlusIcon className=" fill-[#ef4444] text-white w-9 h-9" />
    </div>
  );
};
