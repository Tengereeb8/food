"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

type Order = {
  id: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  user: { email: string };
  foodOrderItems: {
    quantity: number;
    food: { foodName: string; image: string; price: string };
  }[];
};

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

const OrdersTable = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("http://127.0.0.1:3001/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    try {
      const res = await fetch(`http://127.0.0.1:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500">{orders.length} items</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600 bg-white shadow-sm">
              <CalendarIcon size={16} />
              <span>13 June 2023 - 14 July 2023</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-4">№</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4 text-center">Food</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4 text-right pr-10">Delivery state</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, idx) => (
                <React.Fragment key={order.id}>
                  <tr className="text-sm text-gray-600 hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-4">{idx + 1}</td>
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {order.user.email}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() =>
                          setExpandedOrderId(
                            expandedOrderId === order.id ? null : order.id,
                          )
                        }
                        className="flex items-center gap-2 mx-auto px-3 py-1.5 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        <span className="font-medium underline decoration-gray-300 underline-offset-4">
                          {order.foodOrderItems.length} items
                        </span>
                        <ChevronDown
                          size={14}
                          className={cn(
                            "text-gray-400 transition-transform duration-200",
                            expandedOrderId === order.id && "rotate-180",
                          )}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="px-4 py-4 text-right pr-6">
                      <div className="flex justify-end">
                        <Select
                          value={order.status}
                          onValueChange={(v) =>
                            handleStatusChange(order.id, v as OrderStatus)
                          }
                        >
                          <SelectTrigger
                            className={cn(
                              "w-30 h-9 rounded-full font-medium border-2 transition-all shadow-sm",
                              getStatusStyles(order.status),
                            )}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl shadow-xl border-gray-100">
                            <SelectGroup>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="DELIVERED">
                                Delivered
                              </SelectItem>
                              <SelectItem value="CANCELED">Canceled</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>

                  {expandedOrderId === order.id && (
                    <tr className="bg-gray-50/50">
                      <td
                        colSpan={7}
                        className="px-12 py-6 border-inner shadow-inner"
                      >
                        <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                          {order.foodOrderItems.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm w-full md:w-[280px]"
                            >
                              <img
                                src={item.food.image}
                                alt=""
                                className="w-16 h-16 rounded-xl object-cover ring-1 ring-gray-100"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                  {item.food.foodName}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-gray-500">
                                    Qty: {item.quantity}
                                  </p>
                                  <p className="text-sm font-black text-emerald-600">
                                    ${item.food.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/30">
          <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full text-sm font-bold shadow-md">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white border border-transparent hover:border-gray-200 rounded-full text-sm transition-all">
            2
          </button>
          <button className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
