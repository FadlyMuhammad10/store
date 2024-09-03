import Cookies from "js-cookie";
import axios from "../axios";

export default async function CallAPI({
  url,
  method,
  data,
  token,
  serverToken,
}) {
  let headers = {};
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get("token");
    if (tokenCookies) {
      const jwtToken = tokenCookies;
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    } else if (!tokenCookies) {
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  return response;
}
