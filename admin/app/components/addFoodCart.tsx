"use client";
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
            {/* <DialogDescription>
              Enter the details for the new appetizer.
            </DialogDescription> */}
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
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price...`"
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
