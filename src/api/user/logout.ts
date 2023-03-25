import axios from "@/lib/axios";
import { TAuthUser } from "@/types";

const logout = async ({ email, password }: TAuthUser) => {
  try {
    const res = await axios.post(`/logout`, {
      email,
      password,
    });
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default logout;
