// import { cookies } from "next/headers";

// export const getUser = async () => {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("token")?.value;

//   const response = await fetch("http://localhost:3001/users/profile", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();
//   console.log(data);

//   return data;
// };
