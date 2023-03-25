import axios from "@/lib/axios";

const fetchUserLots = async (userId: string) => {
  try {
    const res = await axios.get(`/users/${userId}/lots`);
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default fetchUserLots;
