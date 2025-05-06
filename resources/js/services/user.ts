import { User } from "@/types/user";
import api from "@/utils/api";

export const getUser = async (): Promise<User> => {
  const res = await api.get<User>("/user");
  return res.data;
}

export const updateUser = async (): Promise<User> => {
    const res = await api.put<User>(`/user`);
    return res.data;
};