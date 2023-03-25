import axios from "@/lib/axios";
import { TTransaction } from "@/types";

const putTransferLot = async (transactionData: Partial<TTransaction>) => {
  try {
    const res = await axios.put(
      `/lots/${transactionData.lotId}/transfer`,
      transactionData
    );
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default putTransferLot;
