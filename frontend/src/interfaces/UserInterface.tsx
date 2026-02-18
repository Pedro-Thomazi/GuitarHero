export interface User {
  id: string,
  name: string,
  email: string,
  notification: [],
  userCart: [],
  statusAdmin: boolean
}

export interface UserCreate {
  name: string,
  password: string,
  email: string,
}