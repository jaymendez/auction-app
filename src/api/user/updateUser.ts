import axios from "@/lib/axios";
import { IUser } from "@/types";

const updateUser = async ({
  userId,
  body,
}: {
  userId: string;
  body: Partial<Omit<IUser, "_id">>;
}) => {
  try {
    const res = await axios.put(`/users/${userId}`, body);
    return res;
  } catch (err: any) {
    throw err?.response?.data?.message || "Error Encountered.";
  }
};

export default updateUser;
