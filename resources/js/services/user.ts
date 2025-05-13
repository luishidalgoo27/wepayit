import { API_URL } from "@/config";
import api from "@/utils/api";
import { User } from "@/types/user";

export const getUser = async (): Promise<User> => {
  const res = await api.get(`${API_URL}/user`);
  return res.data
};

export const getUsersByGroup = async (groupId: string): Promise<User[]> => {
  const res = await api.post(`${API_URL}/getUsers`, {
    id: groupId
  });
  return res.data;
}

export const updateUser = async (name: string, telephone: string): Promise<User> => {
    const res = await api.put(`${API_URL}/user`, {
      name: name,
      telephone: telephone
    });

    return res.data.user;
};

export const deleteUser = async (): Promise<User> => {
  const res = await api.delete<User>(`${API_URL}/user`);
  return res.data;
};