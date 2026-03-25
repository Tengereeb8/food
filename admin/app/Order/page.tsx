import React from "react";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const OrdersTable = () => {
  const orders = Array(10).fill({
    id: 1,
    customer: "Test@gamil.com",
    food: "2 foods",
    date: "2024/12/20",
    total: "$26.97",
    address: "2024/12/СБД, 12-р хороо, СБД...",
    status: "Pending",
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header Section */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500">32 items</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-600 bg-white">
              <CalendarIcon size={16} />
              <span>13 June 2023 - 14 July 2023</span>
            </div>
            <button className="bg-[#18181b] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              Change delivery state
              <span className="bg-white text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                1
              </span>
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-4">№</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Food</th>
                <th className="px-4 py-4 flex items-center gap-1">
                  Date <ChevronDown size={14} />
                </th>
                <th className="px-4 py-4">Total</th>
                <th className="px-4 py-4">Delivery Address</th>
                <th className="px-4 py-4 flex items-center gap-1 text-right">
                  Delivery state <ChevronDown size={14} />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order, idx) => (
                <tr
                  key={idx}
                  className="text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">{order.id}</td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                      {order.food}{" "}
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-500">{order.date}</td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-4 py-4 max-w-xs truncate text-gray-500">
                    {order.address}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-red-200 text-red-600 bg-red-50 font-medium cursor-pointer hover:bg-red-100 transition-colors">
                      {order.status} <ChevronDown size={14} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 flex items-center justify-end gap-2 border-t border-gray-100">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-sm">
            3
          </button>
          <span className="text-gray-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full text-sm">
            10
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
