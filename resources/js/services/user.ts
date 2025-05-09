import { API_URL } from "@/config";
import api from "@/utils/api";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
  const res = await api.get(`${API_URL}/user`);
  return res.data
};

export const getUsersByGroup = async (groupId: string): Promise<User[]> => {
  const res = await api.post(`${API_URL}/getUsers`);
  return res.data;
}

export const updateUser = async (): Promise<User> => {
    const res = await api.put<User>(`${API_URL}/user`);
    return res.data;
};

export const deleteUser = async (): Promise<User> => {
  const res = await api.delete<User>(`${API_URL}/user`);
  return res.data;
};