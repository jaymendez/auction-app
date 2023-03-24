import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

const baseDomain = process.env.NEXT_PUBLIC_API_URL;

const baseURL = `${baseDomain}/`;

const headers: Partial<AxiosHeaders> = {};

const token = Cookies.get("Authorization")
  ? `Bearer ${Cookies.get("Authorization")}`
  : "";

if (token) {
  headers.Authorization = token;
}

export default axios.create({
  baseURL,
  headers,
  withCredentials: true,
  // other options
});
