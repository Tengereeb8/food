"use client";
import { useState, useRef } from "react";
import { ImagePlusIcon } from "lucide-react"; // Nice icon for uploads
import { CirclePlusIcon, PencilIcon, Plus } from "lucide-react";

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

export const AddFoodCart = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-67.75 h-60.25 rounded-[20px] border border-red-500 border-dashed p-4 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-red-50 transition-colors">
          <div className="size-10 bg-red-500 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-white " />
          </div>
          <h1 className="w-38.5 h-10 text-center font-medium">
            Add new Dish to Appetizers
          </h1>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted!");
          }}
        >
          <DialogHeader>
            <DialogTitle>Add New Dish to Appetizers</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <div className="flex gap-6">
              <Field>
                <Label htmlFor="dish-name">Food Name</Label>
                <Input
                  id="dish-name"
                  name="dish-name"
                  placeholder="Type food name"
                />
              </Field>
              <Field>
                <Label htmlFor="price">Food Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price..."
                />
              </Field>
            </div>
            <Field>
              <Label htmlFor="ingredients">Ingredients</Label>
              <textarea
                id="ingredients"
                name="ingredients"
                placeholder="List ingredients..."
                className="w-103 h-22.5 p-3 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
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
            <DialogClose></DialogClose>
            <Button type="submit">Add Dish</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
