import axios from "@/lib/axios";

const AddBidToLot = async ({ lotId, body }: any) => {
  try {
    const res = await axios.put(`/lots/${lotId}/transaction`, body);
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default AddBidToLot;
