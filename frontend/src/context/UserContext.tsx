import { createContext, useContext, type ReactNode } from "react";
import type { UserLogin } from "../interfaces/UserInterface";
import type { NavigateFunction } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import type { DataCreateProduct, DataImage } from "../interfaces/ProductInterface";
import useProduct from "../hooks/useProduct";

interface AuthContextType {
  authenticated?: boolean,
  login: (user: UserLogin, navigate: NavigateFunction) => Promise<void>
  logout: () => Promise<void>

  // Funções do Produto
  createProduct: (product: DataCreateProduct, image: DataImage, token: string, navigate: NavigateFunction) => Promise<void>
}

const Context = createContext<AuthContextType | undefined>(undefined)

function UserProvider({ children }: { children: ReactNode }) {
  const {
    authenticated,
    login,
    logout
  } = useAuth()
  const {
    createProduct
  } = useProduct()

  return (
    <Context.Provider value={{ authenticated, login, logout, createProduct }}>
      {children}
    </Context.Provider>
  )
}

function useAuthContext() {
  const context = useContext(Context)
  if (!context) throw new Error("Erro no useAuthContext.")

  return context
}

export {
  Context,
  UserProvider,
  useAuthContext
}