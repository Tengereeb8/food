import SignIn from "./sign-in/page";

const Home = () => {
  // const categories = await fetch("http://localhost:3002/api/categories");
  // const data = await categories.json();
  // console.log(data);

  return (
    <div className="flex items-center mx-auto">
      <div className="flex ">
        <SignIn />
      </div>
      <img src="/login.jpg" alt="Aa" className="w-214" />
    </div>
  );
};

export default Home;
