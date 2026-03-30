"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { LayoutDashboard, TruckIcon } from "lucide-react";
import Link from "next/link";

export const SideBar = () => {
  const [clicked, setClicked] = useState("foodMenu");
  const handleToggle = (id: string) => {
    setClicked(id);
  };
  const changeColor = (id: string) =>
    clicked === id ? "text-[#E4E4E7] bg-black " : "text-[#09090B] bg-white ";

  return (
    <div className="flex justify-center w-51.25 gap-2.5 px-5 pl-5 bg-white">
      <Sidebar className="flex justify-center w-51.25  border-r pl-5">
        <div className="flex justify-center w-41.25 h-11 pr-5.25 gap-2 items-center relative top-9">
          <img src="/logo.png" className="size-9" alt="Logo" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-[#09090B]">NomNom</div>
            <div className="text-sm text-[#71717A]">Swift delivery</div>
          </div>
        </div>
        <SidebarContent className="flex flex-col gap-4 ">
          <Link href={"/food-menu"}>
            <Button
              onClick={() => handleToggle("foodMenu")}
              className={`relative top-18 w-41.25 h-10 justify-center gap-2.5 rounded-full px-6 transition-all ${changeColor("foodMenu")}`}
            >
              <LayoutDashboard className="size-5.5" />

              <span>Food menu</span>
            </Button>
          </Link>
          <Link href={"/order"}>
            <Button
              onClick={() => handleToggle("orders")}
              className={`relative top-18 w-41.25 h-10 justify-start gap-3 rounded-full px-8.25 transition-all ${changeColor("orders")}`}
            >
              <TruckIcon className="size-5.5" />
              <span>Orders</span>
            </Button>
          </Link>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
