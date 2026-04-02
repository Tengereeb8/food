import { FoodCart } from "../components/foodCart";
import { Header } from "../components/Header";

const Client = () => {
  return (
    <div className="max-w-360 mx-auto">
      <img src="/food.png" alt="" />
      <div className=" max-w-360 justify-center mx-auto gap-5 flex">
        <FoodCart />
      </div>
    </div>
  );
};

export default Client;
