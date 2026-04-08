import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return;

  const response = await fetch(`https://food-r2o4.onrender.com/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
};
