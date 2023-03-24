import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<any, any>> => {
  try {
    const res = await axios.post(`/login`, {
      email,
      password,
    });
    return res;
  } catch (err: any) {
    throw new Error(err?.toString());
  }
};

export default login;
