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
  const res = await api.post(`${API_URL}/user`, {
    name,
    telephone
  });
  return res.data;
};

export const deleteUser = async (): Promise<User> => {
  const res = await api.delete(`${API_URL}/user`);
  return res.data;
};

export const updateAvatar = async (image: File | null): Promise<User> => {
  const res = await api.post(`${API_URL}/updateAvatar`, {
    image
  }, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res.data;
};

export const deleteAvatar = async (): Promise<User> => {
  const res = await api.post(`${API_URL}/deleteAvatar`);
  return res.data;
};

export const acceptInvitation = async (code:string): Promise<Object> => {
  const res = await api.get(`${API_URL}/invitations/accept/${code}`);
  return res.data;
};



