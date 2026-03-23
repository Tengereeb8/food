import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboardIcon, TruckIcon } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="px-5 py-9">
        <div className="flex gap-2 items-center px-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <p className="font-bold flex flex-col text-lg leading-tight">
            NomNom
            <span className="text-[#71717a] text-xs font-normal">
              Swift Delivery
            </span>
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <Link href="/Food-Menu">
                  <Badge className="w-41.25 h-10 gap-2.5 flex items-center px-4 justify-start cursor-pointer">
                    <LayoutDashboardIcon size={20} className="shrink-0" />
                    <p className="text-sm font-medium">Food Menu</p>
                  </Badge>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Badge
                  variant="outline"
                  className="w-41.25 h-10 bg-white gap-2.5 flex items-center px-4 justify-start border-gray-200 shadow-none hover:bg-gray-50 cursor-pointer"
                >
                  <TruckIcon size={20} className="text-black shrink-0" />
                  <p className="text-sm text-black font-medium">Orders</p>
                </Badge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
