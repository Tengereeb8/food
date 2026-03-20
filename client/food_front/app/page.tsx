import { FoodCart } from "./components/foodCart";

const Home = async () => {
  return (
    <div className="flex mx-auto flex-col text-black  font-sans">
      <header>
        <img src="/food.png" alt="" className="max-w-360 h-142.5" />
      </header>
      <FoodCart />
    </div>
  );
};

export default Home;
