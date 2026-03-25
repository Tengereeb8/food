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

      <DialogContent className="sm:max-w-118 sm:max-h-149">
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Dishes Info</DialogTitle>
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
                  defaultValue="Brie Crostini Appetizer"
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

                <Input
                  className="w-72 text-xs text-[#71717a]"
                  id="dish-category"
                  defaultValue="Appetizerj"
                />
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
                  id="dish-ingredient"
                  defaultValue="12.99"
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
                  defaultValue="12.99"
                  type="float"
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
              </div>
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
