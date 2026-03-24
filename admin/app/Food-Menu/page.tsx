import { Category } from "../components/disher-category";
import { AdminFood } from "../components/food-admin";

const Menu = async () => {
  return (
    <div className="w-screen h-screen bg-[#f4f4f5] font-inter ">
      <Category />
      <AdminFood />
    </div>
  );
};

export default Menu;
