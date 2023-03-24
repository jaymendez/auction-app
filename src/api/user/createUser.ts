import axios from "@/lib/axios";
import { TAuthUser } from "@/types";

const createUser = async ({ email, password }: TAuthUser) => {
  try {
    const res = await axios.post(`/users`, {
      email,
      password,
    });
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default createUser;
