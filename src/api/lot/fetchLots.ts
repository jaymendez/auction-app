import axios from "@/lib/axios";

const fetchLots = async () => {
  try {
    const res = await axios.get(`/lots`);
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default fetchLots;
