import { useEffect, useState } from "react";
import axios from "axios";
import type { DataToken, UserLogin } from "../interfaces/UserInterface";
import type { NavigateFunction } from "react-router-dom";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>()

  useEffect(()=> {
    const token = localStorage.getItem("token")

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.stringify(token)}`

      setAuthenticated(true)

      const logoutTimer = setTimeout(() => {
        setAuthenticated(false)

        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
      }, 120 * 60 * 1000)

      return () => clearInterval(logoutTimer)
    }
  }, [])

  async function authUser(data:DataToken) {
    setAuthenticated(true)

    localStorage.setItem("token", JSON.stringify(data.token))
  }

  async function login(user:UserLogin, navigate: NavigateFunction) {
    try {
      const res = await fetch("http://localhost:5050/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      if (!res.ok) throw new Error("Erro ao fazer o Login. Tente novamente mais tarde!")

      const data = await res.json()
      await authUser(data)
      await navigate("/")
    } catch (error) {
      console.log("Erro Login: " + error)
      alert("Erro ao fazer o Login. Tente novamente mais tarde!")
    }
  }


  return {
    authenticated,
    login
  }
}