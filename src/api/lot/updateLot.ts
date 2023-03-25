import axios from "@/lib/axios";
import { ILot } from "@/types";

const updateLot = async (body: Partial<ILot>) => {
  try {
    const res = await axios.put(`/lots/${body._id}`, body);
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default updateLot;
