"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "../server/auth/signIn";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    const credentials = {
      email,
      password,
    };
    try {
      const data = await signIn(credentials);

      localStorage.setItem("token", data?.token);
      router.push("http://localhost:3002/order");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mx-auto flex-col text-black  font-sans">
      <h1 className="text-2xl font-semibold">Log in </h1>
      <p className="text-zinc-500">Log in to enjoy your favorite dishes</p>
      <div className="flex flex-col gap-4 pt-6 pb-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-104 h-9"
        />

        <Input
          // type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <p className="text-sm pb-6">Forgot password?</p>

      <Button onClick={onSubmit}>Let's Go</Button>

      <p className="text-zinc-500 pt-6 ">
        Don't have an account? <span className="text-blue-500">Sign up</span>
      </p>
      {/* <FoodCart /> */}
      {/* <App /> */}
    </div>
  );
};

export default SignIn;
