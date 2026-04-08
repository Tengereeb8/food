// app/orders/page.tsx

import OrdersTable from "./OrdersTable";

async function getOrders() {
  const res = await fetch("https://food-r2o4.onrender.com/orders", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
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
