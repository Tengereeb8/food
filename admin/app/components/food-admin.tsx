import { AddFoodCart } from "./addFoodCart";
import { AdminFoodCart } from "./admin-card";

export const AdminFood = async () => {
  return (
    <div className="mt-6 bg-white w-fit p-5 rounded-xl">
      <h1 className="text-xl pb-4">Appetizers</h1>
      <div className="flex gap-4">
        <AddFoodCart />
        <AdminFoodCart />
      </div>
    </div>
  );
};
