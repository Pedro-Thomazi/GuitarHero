import type { User } from "./UserInterface"

export interface Product {
  id: string,
  name: string,
  price: number,
  images: [],
  description: string
  user: User,
  inStock: boolean
}