import axios from "@/lib/axios";

const AddBidToLot = async ({ lotId, body }: any) => {
  try {
    const res = await axios.put(`/lots/${lotId}/transaction`, body);
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default AddBidToLot;
