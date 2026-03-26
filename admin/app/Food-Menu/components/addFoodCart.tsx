"use client";
import { useState, useRef, ChangeEventHandler } from "react";
import { ImagePlusIcon, Plus, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

interface AddFoodCartProps {
  categoryId: number;
}

export const AddFoodCart = ({ categoryId }: AddFoodCartProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState({
    foodName: "",
    price: 0,
    foodCategoryId: categoryId,
    ingredients: "",
    image: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFood((prev) => ({
        ...prev,
        image: "https://example.com/placeholder.jpg",
      }));
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value, type } = event.target;
    setFood({
      ...food,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const onAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(food),
      });

      if (response.ok) {
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to add dish:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="w-64 h-60 rounded-[20px] border border-red-500 border-dashed p-4 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-red-50 transition-colors">
          <div className="size-10 bg-red-500 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-center font-medium">Add new Dish</h1>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={onAddDish}>
          <DialogHeader>
            <DialogTitle>Add New Dish</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <div className="flex gap-4">
              <Field className="flex-1">
                <Label htmlFor="foodName">Food Name</Label>
                <Input
                  id="foodName"
                  name="foodName"
                  placeholder="Type food name"
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field className="w-32">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  required
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="ingredients">Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                placeholder="List ingredients..."
                onChange={handleChange}
              />
            </Field>

            <Field>
              <Label>Dish Image</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 cursor-pointer w-full h-40 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:bg-gray-50 transition-all"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <ImagePlusIcon className="w-8 h-8" />
                    <span className="text-xs">Click to upload photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Loader className="animate-spin" /> : "Add Dish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
