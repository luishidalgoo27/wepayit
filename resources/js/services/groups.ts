import { API_URL } from "@/config"
import { Group } from "@/types/group"
import api from "@/utils/api"

export const getGroups = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/groups`)
    return res.data
}

export const updateGroup = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/groups`)
    return res.data
}

export const deleteGroup = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/groups`)
    return res.data
}