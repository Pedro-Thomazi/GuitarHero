import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UserContext";
import { useEffect, useState, type JSX } from "react";
import type { User } from "../interfaces/UserInterface";
import axios from "axios";


export function ProtectRouter({ children }: { children: JSX.Element }) {
  const { authenticated, loading } = useAuthContext()
  if (loading) return <p>Carregando...</p>


  if (!authenticated) return <Navigate to={"/login"} replace />

  return children
}

export function ProtectRouterAuth({ children }: { children: JSX.Element }) {
  const { authenticated, loading } = useAuthContext()
  if (loading) return <p>Carregando...</p>


  if (authenticated) return <Navigate to={"/"} replace />

  return children
}

export function ProtectRouterIfUserNotAdmin({ children }: { children: JSX.Element }) {
  const { authenticated, loading } = useAuthContext()
  const [token] = useState(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()

  if (loading) return <p>Carregando...</p>

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5050/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUser(res.data)
      })
    }
  }, [token])

  if (!user?.statusAdmin || !authenticated) return <Navigate to={"/"} replace />

  return children
}