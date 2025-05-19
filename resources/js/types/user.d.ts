export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  avatar: string|null,
  telephone: string|null,
  languague: string,
}

export interface CreateUser {
  id: number,
  name: string,
  email: string,
  avatar: string|null,
  telephone: string|null,
  languague: string,
}

export interface UpdateUser {
  name: string,
  telephone: string,
}

export interface EditUserForm {
  name: string,
  telephone: string,
}