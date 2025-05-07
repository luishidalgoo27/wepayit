import { API_URL } from "@/config";
import { User } from "@/types/user";
import api from "@/utils/api";

export const fetchUser = async (): Promise<User> => {
    const res = await api.get(`${API_URL}/user`);
    return res.data
};