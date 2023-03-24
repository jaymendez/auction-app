import axios from "@/lib/axios";
import { ILot } from "@/types";

const updateLot = async (body: ILot) => {
  try {
    const res = await axios.put(`/lots/${body._id}`, body);
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default updateLot;
