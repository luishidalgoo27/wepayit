import { API_URL } from "@/config"
import { Group } from "@/types/group"
import { User } from "@/types/user"
import api from "@/utils/api"

/* GET ALL USER GROUPS */
export const getGroups = async (): Promise<Group[]> => {
    const res = await api.get(`${API_URL}/groups`)
    return res.data
}

/* GET GROUP */
export const getGroup = async (id: string): Promise<Group> => {
    const res = await api.post(`${API_URL}/get-group`, {
        group_id: id
    })
    return res.data
}

/* CREATE GROUP */
export const createGroup = async (name: string, currency_type: string, description: string, image: File | null): Promise<Group> => {
    const res = await api.post(`${API_URL}/group`, {
        name: name,
        currency_type: currency_type,
        description: description,
        image: image
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return res.data
}

/* EDIT GROUP */
export const updateGroup = async (): Promise<Group[]> => {
    const res = await api.get(`${API_URL}/group`)
    return res.data
}

/* DELETE GROUP */
export const deleteGroup = async (group_id: number): Promise<Group[]> => {
    const res = await api.post(`${API_URL}/deleteGroup`, {
        group_id: group_id,
    });
    return res.data
}

/* CANTIDAD DE USUARIOS EN UN GRUPO */
export const getUserCount = async (group_id: number): Promise<number> => {
    const res = await api.post(`${API_URL}/userCount`, {
        group_id: group_id,
    });
    return res.data.user_count;
}

/* INVITE USER TO GROUP */
export const inviteUserToGroup = async (group_id: string, userEmail:string): Promise<Object> => {
    const res = await api.post(`${API_URL}/invitation`, {
        group_id: group_id,
        guest_email: userEmail,
    });
    return res.data;
}

/* REMOVE USER GROUP */
export const removeUserFromGroup = async (group_id: string, user_id: string): Promise<Object> => {
    const res = await api.post(`${API_URL}/deleteUser`, {
        group_id: group_id,
        user_id: user_id
    });
    return res.data;
}

/* SEARCH USERS GROUP */
export const searchUsers = async (username: string): Promise<User[]> => {
    const res = await api.post(`${API_URL}/search-users`, {
        username: username,
    });
    return res.data.slice(0, 3);
}