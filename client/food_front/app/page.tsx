import SignIn from "./sign-in/page";

const Home = () => {
  // const categories = await fetch("http://localhost:3002/api/categories");
  // const data = await categories.json();
  // console.log(data);

  return (
    <div className="flex items-center justify-center bg-white w-screen">
      <div className="flex ">
        <SignIn />
      </div>
      <img
        src="/login.jpg"
        alt="Aa"
        className="w-214 h-screen py-5 pl-12 rounded-lg"
      />
    </div>
  );
};

export default Home;
