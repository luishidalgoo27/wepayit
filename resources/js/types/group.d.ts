export interface Group {
    id: number,
    name: string,
    description: string|null,
    currency_type: string
    photo: string|null
    owner_id: number
}

export interface UserGroup {
    id: number,
    group_id: number,
    user_id: number,
}

export interface GroupInvitation {
    id: number,
    group_id: number,
    user_id: number|null,
    guest_email: string,
    invitation_code: string,
    status: boolean,
}