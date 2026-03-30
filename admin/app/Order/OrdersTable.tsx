// "use client";
// import React, { useState } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

// interface OrdersTableProps {
//   initialOrders: any[];
// }

// const getStatusStyles = (status: OrderStatus) => {
//   switch (status) {
//     case "PENDING":
//       return "border-red-500 text-black";
//     case "DELIVERED":
//       return "border-green-500 text-black";
//     case "CANCELED":
//       return "border-gray-500 text-black";
//     default:
//       return "border-gray-500";
//   }
// };

// export default function OrdersTable({ initialOrders }: OrdersTableProps) {
//   const [orders, setOrders] = useState(initialOrders);
//   const [active, setActive] = useState(true);

//   const handleStatusChange = async (
//     orderId: number,
//     newStatus: OrderStatus,
//   ) => {
//     setOrders((prev) =>
//       prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
//     );

//     try {
//       await fetch(`http://127.0.0.1:3001/orders/${orderId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//     } catch (error) {
//       console.error("Failed to update status on server", error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//       <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Orders</h1>
//           <p className="text-sm text-zinc-500 font-medium">
//             {orders.length} items
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-600 bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
//             <CalendarIcon size={16} className="text-gray-400" />
//             <span className="font-medium">13 June 2023 - 14 July 2023</span>
//           </div>
//           <div>
//             <Button className="px-4 py-2 h-9 rounded-full" disabled={active}>
//               Change Delivery State
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50/50 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
//             <tr>
//               <th className="px-6 py-4 w-10">
//                 <input type="checkbox" className="rounded border-gray-300" />
//               </th>
//               <th className="px-4 py-4">№</th>
//               <th className="px-4 py-4">Customer</th>
//               <th className="px-4 py-4">Food</th>
//               <th className="px-4 py-4">Total</th>
//               <th className="px-4 py-4 text-right pr-10">Delivery state</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {orders.map((order, idx) => (
//               <tr
//                 key={order.id}
//                 className="text-[13px] hover:bg-gray-50/50 transition-colors"
//               >
//                 <td className="px-6 py-4">
//                   <input type="checkbox" className="rounded border-gray-200" />
//                 </td>
//                 <td className="px-4 py-4 text-black font-mono">{idx + 1}</td>
//                 <td className="px-4 py-4 font-semibold text-zinc-500">
//                   {order.user.email}
//                 </td>

//                 <td className="px-4 py-4">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger>
//                       <button className="flex items-center gap-2 font-medium text-gray-600 hover:text-gray-900 outline-none">
//                         {order.foodOrderItems.length} foods
//                         <ChevronDown size={14} className="text-zinc-500" />
//                       </button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent
//                       style={{ width: "263px" }}
//                       className="p-3 rounded-xl shadow-xl bg-white border-gray-100"
//                     >
//                       <div className="space-y-4">
//                         {order.foodOrderItems.map((item: any, i: number) => (
//                           <div
//                             key={i}
//                             className="flex items-center justify-between gap-3"
//                           >
//                             <div className="flex items-center gap-3">
//                               <img
//                                 src={item.food.image}
//                                 alt=""
//                                 className="w-10 h-10 rounded-lg object-cover bg-gray-100 shadow-sm"
//                               />
//                               <span className="text-sm font-medium text-zinc-500 truncate max-w-[140px]">
//                                 {item.food.foodName}
//                               </span>
//                             </div>
//                             <span className="text-sm text-zinc-500 whitespace-nowrap font-mono">
//                               x {item.quantity}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </td>

//                 <td className="px-4 py-4 font-bold text-zinc-500">
//                   ${order.totalPrice}
//                 </td>

//                 <td className="px-4 py-4 text-right pr-6">
//                   <div className="inline-block min-w-[100px]">
//                     <Select
//                       value={order.status}
//                       onValueChange={(val) =>
//                         handleStatusChange(order.id, val as OrderStatus)
//                       }
//                     >
//                       <SelectTrigger
//                         className={cn(
//                           "h-8 rounded-full text-[11px] font-bold border px-4 w-full transition-all shadow-none",
//                           getStatusStyles(order.status),
//                         )}
//                       >
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent className="rounded-xl border-gray-100 shadow-xl">
//                         <SelectItem value="PENDING">PENDING</SelectItem>
//                         <SelectItem value="DELIVERED">DELIVERED</SelectItem>
//                         <SelectItem value="CANCELED">CANCELED</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

interface OrdersTableProps {
  initialOrders: any[];
}

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "border-red-500 text-black";
    case "DELIVERED":
      return "border-green-500 text-black";
    case "CANCELED":
      return "border-gray-500 text-black";
    default:
      return "border-gray-500";
  }
};

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    try {
      await fetch(`http://127.0.0.1:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Failed to update status on server", error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o.id)));
    }
  };

  const toggleSelectRow = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-zinc-500 font-medium">
            {orders.length} items
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-600 bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
            <CalendarIcon size={16} className="text-gray-400" />
            <span className="font-medium">13 June 2023 - 14 July 2023</span>
          </div>

          <Button
            className="px-4 py-2 h-9 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 transition-all"
            disabled={selectedIds.size === 0}
          >
            Change Delivery State
            {selectedIds.size > 0 && (
              <span className="flex items-center justify-center bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full">
                {selectedIds.size}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 w-10">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 accent-black"
                  checked={
                    orders.length > 0 && selectedIds.size === orders.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-4">№</th>
              <th className="px-4 py-4">Customer</th>
              <th className="px-4 py-4">Food</th>
              <th className="px-4 py-4">Total</th>
              <th className="px-4 py-4 text-right pr-10">Delivery state</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className={cn(
                  "text-[13px] transition-colors",
                  selectedIds.has(order.id)
                    ? "bg-blue-50/30"
                    : "hover:bg-gray-50/50",
                )}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-200 accent-black"
                    checked={selectedIds.has(order.id)}
                    onChange={() => toggleSelectRow(order.id)}
                  />
                </td>
                <td className="px-4 py-4 text-black font-mono">{idx + 1}</td>
                <td className="px-4 py-4 font-semibold text-zinc-500">
                  {order.user.email}
                </td>

                <td className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="flex items-center gap-2 font-medium text-gray-600 outline-none">
                        {order.foodOrderItems.length} foods
                        <ChevronDown size={14} className="text-zinc-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      style={{ width: "263px" }}
                      className="p-3 rounded-xl shadow-xl bg-white border-gray-100"
                    >
                      {/* ... content items ... */}
                      //{" "}
                      <DropdownMenuContent
                        style={{ width: "263px" }}
                        className="p-3 rounded-xl shadow-xl bg-white border-gray-100"
                      >
                        <div className="space-y-4">
                          {order.foodOrderItems.map((item: any, i: number) => (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.food.image}
                                  alt=""
                                  className="w-10 h-10 rounded-lg object-cover bg-gray-100 shadow-sm"
                                />
                                <span className="text-sm font-medium text-zinc-500 truncate max-w-[140px]">
                                  {item.food.foodName}
                                </span>
                              </div>
                              <span className="text-sm text-zinc-500 whitespace-nowrap font-mono">
                                x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>

                <td className="px-4 py-4 font-bold text-zinc-500">
                  ${order.totalPrice}
                </td>

                <td className="px-4 py-4 text-right pr-6">
                  <div className="inline-block min-w-25">
                    <Select
                      value={order.status}
                      onValueChange={(val) =>
                        handleStatusChange(order.id, val as OrderStatus)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-8 rounded-full text-[11px] font-bold border px-4 w-full shadow-none",
                          getStatusStyles(order.status),
                        )}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                        <SelectItem value="CANCELED">CANCELED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
