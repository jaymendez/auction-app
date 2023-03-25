import axios from "@/lib/axios";
import { ILot } from "@/types";

export type CreateLotProps = Omit<
  ILot,
  "auctionTime" | "bids" | "status" | "_id"
>;

const createLot = async ({ name, startingPrice, userId }: CreateLotProps) => {
  try {
    const res = await axios.post(`/lots`, {
      name,
      startingPrice,
      userId,
    });
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default createLot;
