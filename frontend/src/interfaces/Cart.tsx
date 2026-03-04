import type { Product } from "./ProductInterface"
import type { User } from "./UserInterface"

export interface Cart {
  _id: string
  dateBuy: string
  price: number
  image: string
  quantity: number
  inStock: boolean
  user: User
  product: Product
}