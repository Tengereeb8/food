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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { getStatusStyles } from "./funcions/status-style";
import { Header } from "../components/Header";

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState<OrderStatus>("DELIVERED");

  const toggleSelectAll = () => {
    if (selectedIds.size === orders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(orders.map((o) => o.id)));
    }
  };

  const toggleSelectRow = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleStatusChange = async (
    orderId: number,
    newStatus: OrderStatus,
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    await fetch(`https://food-r2o4.onrender.com/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleBulkUpdate = async () => {
    const idsToUpdate = Array.from(selectedIds);
    setOrders((prev) =>
      prev.map((o) =>
        selectedIds.has(o.id) ? { ...o, status: tempStatus } : o,
      ),
    );
    setSelectedIds(new Set());
    setIsDialogOpen(false);

    await Promise.all(
      idsToUpdate.map((id) =>
        fetch(`https://food-r2o4.onrender.com/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: tempStatus }),
        }),
      ),
    );
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-zinc-500 font-medium">
              {orders.length} items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-600 bg-white shadow-sm">
              <CalendarIcon size={16} className="text-gray-400" />
              <span className="font-medium">13 June 2023 - 14 July 2023</span>
            </div>

            <Dialog
              open={isDialogOpen && selectedIds.size > 0}
              onOpenChange={(open) => {
                if (open && selectedIds.size > 0) {
                  setIsDialogOpen(true);
                } else {
                  setIsDialogOpen(false);
                }
              }}
            >
              <DialogTrigger>
                <Button
                  className="px-4 py-2 h-9 rounded-full bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2"
                  disabled={selectedIds.size === 0}
                >
                  Change delivery state
                  {selectedIds.size > 0 && (
                    <span className="flex items-center justify-center bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full">
                      {selectedIds.size}
                    </span>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-105 p-8 rounded-xl border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl  text-gray-900">
                    Change delivery state
                  </DialogTitle>
                </DialogHeader>
                <div className="flex gap-3 py-8 justify-center">
                  {(["DELIVERED", "PENDING", "CANCELED"] as OrderStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setTempStatus(status)}
                        className={cn(
                          "px-5 h-9 py-2 rounded-full text-sm font-medium transition-all border",
                          tempStatus === status
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100",
                        )}
                      >
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                      </button>
                    ),
                  )}
                </div>
                <Button
                  onClick={handleBulkUpdate}
                  className="w-full h-9 bg-black text-white rounded-full text-sm "
                >
                  Save
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 accent-black w-4 h-4"
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
                      className="rounded border-gray-200 accent-black w-4 h-4"
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
                          {order.foodOrderItems.length} foods{" "}
                          <ChevronDown size={14} className="text-zinc-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        style={{ width: "263px" }}
                        className="p-4 rounded-md shadow-2xl bg-white border-gray-100 space-y-4"
                      >
                        {order.foodOrderItems.map((item: any, i: number) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.food.image}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                              />
                              <span className="text-sm font-medium text-gray-700 truncate max-w-35">
                                {item.food.foodName}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400 font-mono">
                              x {item.quantity}
                            </span>
                          </div>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-4 py-4 font-bold text-zinc-500">
                    ${order.totalPrice}
                  </td>
                  <td className="px-4 py-4 text-right pr-6">
                    <div className="inline-block min-w-27.5">
                      <Select
                        value={order.status}
                        onValueChange={(val) =>
                          handleStatusChange(order.id, val as OrderStatus)
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "h-8 rounded-full text-[11px] font-bold border px-4 w-full shadow-none focus:ring-0",
                            getStatusStyles(order.status),
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
    </div>
  );
}
