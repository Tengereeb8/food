"use client";
import { useState, useRef } from "react";
import { ImagePlusIcon } from "lucide-react"; // Nice icon for uploads
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AdminFoodCart = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for the selected file
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <Dialog>
      <div className="w-67.75 h-fit rounded-[20px] border border-[#e4e4e7] p-4">
        <div className="relative">
          <img
            src="/app.png"
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
          Brie Crostini Appetizer{" "}
          <span className="text-black text-xs ml-2">$12.99</span>
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
        </p>
      </div>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Dishes Info</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="dish-name">Dish Name</Label>
              <Input id="dish-name" defaultValue="Brie Crostini Appetizer" />
            </Field>
            <Field>
              <Label htmlFor="dish-category">Dish category</Label>
              <Input id="dish-category" defaultValue="Appetizerj" />
            </Field>
            <Field>
              <Label htmlFor="dish-ingredients">Ingredients</Label>
              <Input id="dish-ingredient" defaultValue="12.99" />
            </Field>
            <Field>
              <Label htmlFor="dish-price">Price</Label>
              <Input
                id="dish-price"
                defaultValue="12.99"
                type="float"
                step="0.01"
              />
            </Field>
            <Field>
              <Label>Dish Image</Label>

              <div
                onClick={triggerFileInput}
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

              <Input
                id="dish-image"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <div role="delete"></div>
            <Button role="submit" className="bg-black text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
