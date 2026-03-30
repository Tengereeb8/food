// app/orders/page.tsx

import OrdersTable from "./OrdersTable";

async function getOrders() {
  const res = await fetch("http://127.0.0.1:3001/orders", {
    cache: "no-store", // Ensures fresh data on every request
  });

  if (!res.ok) return [];

  const data = await res.json();
  // Ensure we return an array even if the API structure is nested
  return Array.isArray(data) ? data : data.orders || [];
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
