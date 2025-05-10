import { API_URL } from "@/config"
import { Group } from "@/types/group"
import api from "@/utils/api"

export const getGroups = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/groups`)
    return res.data
}

export const getGroup = async (id:string):Promise<Group> => {
    const res = await api.post(`${API_URL}/group`, {
        id: id
    })
    return res.data
}

export const createGroup = async (name: string, currency_type: string, description: string ):Promise<Group[]> => {
    const res = await api.post(`${API_URL}/group`, {
        name: name,
        currency_type: currency_type,
        description: description
    })
    return res.data
}

export const updateGroup = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/group`)
    return res.data
}

export const deleteGroup = async ():Promise<Group[]> => {
    const res = await api.get(`${API_URL}/group`)
    return res.data
}