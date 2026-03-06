import { createContext, useContext, type ReactNode } from "react";
import type { UserLogin, UserRegister } from "../interfaces/UserInterface";
import type { NavigateFunction } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import type { DataCreateProduct, DataImage } from "../interfaces/ProductInterface";
import useProduct from "../hooks/useProduct";

interface AuthContextType {
  authenticated?: boolean,
  loading?: boolean,
  login: (user: UserLogin, navigate: NavigateFunction) => Promise<void>
  register: (user: UserRegister, navigate: NavigateFunction) => Promise<void>
  logout: () => Promise<void>

  // Funções do Produto
  createProduct: (product: DataCreateProduct, image: DataImage, token: string, navigate: NavigateFunction) => Promise<void>
}

const Context = createContext<AuthContextType | undefined>(undefined)

function UserProvider({ children }: { children: ReactNode }) {
  const {
    authenticated,
    loading,
    login,
    register,
    logout
  } = useAuth()
  const {
    createProduct
  } = useProduct()

  return (
    <Context.Provider value={{ authenticated, loading, login, register, logout, createProduct }}>
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