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
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default createUser;
