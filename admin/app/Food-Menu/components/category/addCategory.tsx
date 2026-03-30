"use client";
import { Badge } from "@/components/ui/badge";
import { Check, CirclePlusIcon, Plus } from "lucide-react";
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
import { ChangeEventHandler, useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setCategoryName(event.target.value);
  };

  const onAddCategory = async () => {
    setLoading(true);
    const postBody = {
      categoryName: categoryName,
    };

    try {
      await fetch("http://localhost:3001/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl w-fit">
      <div className=" flex gap-3 items-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div
              role="button"
              className="size-9 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>

              <FieldGroup className="py-6">
                <Field>
                  <Label htmlFor="item-name" className="pb-2">
                    Category Name
                  </Label>
                  <Input
                    id="item-name"
                    placeholder="Type Category Name..."
                    onChange={onChange}
                  />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <Button
                  type="submit"
                  className={`px-4 py-2.5`}
                  onClick={onAddCategory}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Add Category"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
