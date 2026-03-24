"use client";
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
  return (
    <Dialog>
      <div className="w-67.75 h-60.25 rounded-[20px] border border-[#e4e4e7] p-4">
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
              <Label htmlFor="dish-price">Dish category</Label>
              <Input id="dish-price" defaultValue="Appetizerj" />
            </Field>
            <Field>
              <Label htmlFor="dish-price">Ingredients</Label>
              <Input id="dish-price" defaultValue="12.99" />
            </Field>
            <Field>
              <Label htmlFor="dish-price">Price</Label>
              <Input
                id="dish-price"
                defaultValue="12.99"
                type="number"
                step="0.01"
              />
            </Field>
            <Field>
              <Label htmlFor="dish-price">Price</Label>
              <Input
                id="dish-price"
                defaultValue="12.99"
                type="number"
                step="0.01"
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <div role="delete"></div>
            <div role="submit">Save Changes</div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
