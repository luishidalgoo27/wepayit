import { User } from "@/types/user";
import api from "@/utils/api";

export async function getUser(): Promise<User> {
  const res = await api.get<User>("/user");
  return res.data;
}

export const updateUser = async (id: number) => {
    const res = await api.put(`/user/edit/${id}`);
    return res.data;
  };


/* export const getUsers = async () => {
    try {
        const response = await fetch(`/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) {
            console.log('Error al obtener los usuarios')
            return
        } else {
            console.log('Usuarios obtenidos correctamente')
            return { data }
        }

    } catch (error) {
        console.error('Error con el fetching de datos:', error)
    }
} */