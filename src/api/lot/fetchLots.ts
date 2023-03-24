import axios from "@/lib/axios";

const fetchLots = async (props: any) => {
  try {
    let params = {};
    const [user, filter] = props.queryKey;
    if (filter.fetchType === "personal") {
      params = {
        ...params,
        userId: user._id,
      };
    }
    const res = await axios.get(`/lots`, { params });
    return res;
  } catch (err: any) {
    if (err?.message === "Request failed with status code 404") return [];
    throw new Error(err?.toString());
  }
};

export default fetchLots;
