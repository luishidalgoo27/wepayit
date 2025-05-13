import { getUser } from "@/services/user";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
 
export const useGetUser = () => {
    const [user, setUser] = useState<User | undefined>();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const data = await getUser();
          setUser(data);
        } catch (error: any) {
          toast.error("Error al obtener el usuario");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  
    return { user, setUser, loading };
  };
  
  
