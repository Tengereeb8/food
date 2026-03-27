"use client";
import { useState, useRef } from "react";
import { PencilIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Food, Category } from "./category/getCategory";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AdminFoodCartProps = {
  food: Food;
  categories: Category[];
};

export const AdminFoodCart = ({ food, categories }: AdminFoodCartProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    String(food.foodCategoryId),
  );
  const [foodName, setFoodName] = useState(food.foodName);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [price, setPrice] = useState(food.price);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleSave = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/foods/${food.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName,
          ingredients,
          price,
          foodCategoryId: Number(selectedCategoryId),
        }),
      });
      if (!res.ok) throw new Error("Failed to update food");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <div className="w-67.75 h-60.25 rounded-[20px] border border-[#e4e4e7] p-4">
        <div className="relative">
          <img
            src={food.image}
            alt="Dish"
            className="rounded-xl w-60 h-32.25 object-cover"
          />
          <DialogTrigger className="absolute bottom-5 right-5 bg-white p-2 rounded-full shadow-md w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer">
            <div role="button">
              <PencilIcon className="text-red-500 w-4 h-4" />
            </div>
          </DialogTrigger>
        </div>
        <h1 className="text-red-500 font-medium text-sm pt-5 flex justify-between">
          {food.foodName}
          <span className="text-black text-xs ml-2">${food.price}</span>
        </h1>
        <p className="text-xs text-gray-500 mt-2">{food.ingredients}</p>
      </div>

      <DialogContent className="sm:max-w-118 sm:max-h-149">
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              <p className="text-lg">Dishes Info</p>
            </DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <div className="flex justify-between">
                <Label
                  htmlFor="dish-name"
                  className="flex text-xs text-[#71717a]"
                >
                  Dish Name
                </Label>
                <Input
                  className="w-72 text-xs text-[#71717a]"
                  id="dish-name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
            </Field>

            <Field>
              <div className="flex justify-between">
                <Label
                  htmlFor="dish-category"
                  className="flex text-xs text-[#71717a]"
                >
                  Dish category
                </Label>
                <Select
                  value={
                    categories.find(
                      (cat) => cat.id === Number(selectedCategoryId),
                    )?.categoryName ?? ""
                  }
                  onValueChange={(value) => {
                    if (value !== null) setSelectedCategoryId(value);
                  }}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map(
                        (
                          cat, // ← now lists all category names
                        ) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.categoryName}
                          </SelectItem>
                        ),
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </Field>

            <Field>
              <div className="flex justify-between">
                <Label
                  htmlFor="dish-ingredients"
                  className="text-xs text-[#71717a]"
                >
                  Ingredients
                </Label>
                <Input
                  className="w-72 text-xs text-[#71717a]"
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </div>
            </Field>

            <Field>
              <div className="flex justify-between">
                <Label htmlFor="dish-price" className="text-xs text-[#71717a]">
                  Price
                </Label>
                <Input
                  className="w-72 text-xs text-[#71717a]"
                  id="dish-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  step="0.01"
                />
              </div>
            </Field>

            <Field>
              <div className="flex justify-between">
                <Label className="text-xs text-[#71717a]">Dish Image</Label>
                <div
                  onClick={triggerFileInput}
                  className="mt-2 cursor-pointer w-72 h-29 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:bg-gray-50 transition-all"
                >
                  <img
                    src={preview ?? food.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input
                  id="dish-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <div role="delete">
              <Trash />
            </div>
            <Button onClick={handleSave} className="bg-black text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
