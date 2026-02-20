import type { User } from "./UserInterface"

export interface Product {
  _id: string,
  name: string,
  price: number,
  images: string[],
  description: string
  user: User,
  inStock: boolean
}