import axios from "@/lib/axios";

const fetchLots = async (props: any) => {
  try {
    const [user, filter] = props.queryKey;
    let params: any = { status: filter.status };

    if (filter.fetchType === "personal") {
      params = {
        ...params,
        userId: user?._id,
      };
    }
    const res = await axios.get(`/lots`, { params });
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default fetchLots;
