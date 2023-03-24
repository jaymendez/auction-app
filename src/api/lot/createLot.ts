import axios from "@/lib/axios";
import { ILot } from "@/types";

const createLot = async ({
  name,
  startingPrice,
  auctionTime,
}: Omit<ILot, "userId" | "bids" | "status" | "_id">) => {
  try {
    const res = await axios.post(`/lots`, {
      name,
      startingPrice,
      auctionTime,
    });
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default createLot;
