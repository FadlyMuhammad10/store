import CallAPI from "@/configs/api";

export async function SetSignin(data) {
  const url = `/api/signin`;

  return CallAPI({ url, method: "POST", data });
}
export async function SetSignup(data) {
  const url = `/api/signup`;

  return CallAPI({ url, method: "POST", data });
}
