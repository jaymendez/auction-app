import axios from "@/lib/axios";
import { TAuthUser } from "@/types";
import { AxiosResponse } from "axios";

const login = async ({
  email,
  password,
}: TAuthUser): Promise<AxiosResponse<any, any>> => {
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
