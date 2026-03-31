import { cookies } from "next/headers";

type SignInResponse = {
  token: string;
};

export async function GET(request: Request) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  const response = await fetch("http://localhost:3001/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await response.json()) as SignInResponse;

  return new Response(JSON.stringify(data), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
