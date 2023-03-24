import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

const fetchCurrentUser = async (): Promise<AxiosResponse<any, any>> => {
  try {
    const res = await axios.get(`/whoami`);
    return res;
  } catch (err: any) {
    throw new Error(err?.toString());
  }
};

export default fetchCurrentUser;
