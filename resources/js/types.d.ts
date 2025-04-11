interface User {
    id: string
}

export type UserId = Pick<User, 'id'>