"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "../server/auth/signIn";

const SignIn = () => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mx-auto flex-col text-black  font-sans">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        // type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button onClick={onSubmit}>Sign In</Button>
      {/* <FoodCart /> */}
      {/* <App /> */}
    </div>
  );
};

export default SignIn;
