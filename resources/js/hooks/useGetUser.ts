// hooks/useGetUser.ts
import useSWR from "swr";
import api from "@/utils/api";

const fetchUser = async () => {
  const res = await api.get("/user"); 
  return res.data;
};

export default function useGetUser() {
  const { data: user, error, isLoading, mutate } = useSWR("user", fetchUser);

  return { user, isLoading, error, mutate };
}