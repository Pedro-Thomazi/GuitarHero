import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react';
import type { User } from '../../interfaces/UserInterface';
import { useAuthContext } from '../../context/UserContext';
import axios from 'axios';
import FormSearch from '../FormSearch/FormSearch';

const Navbar = () => {
  const { authenticated, logout } = useAuthContext()
  const [token] = useState<string>(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if(token) {
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

  console.log(authenticated)

  // Actions menu dropdown
  const [downOpen, setDownOpen] = useState<boolean>(false)

  function actionDropDown() {
    if (downOpen) {
      setDownOpen(false)
    } else {
      setDownOpen(true)
    }
  }

  return (
    <nav className={styles.navbar}>
      <FormSearch />
      {authenticated ? (
        <Link to={"/dashboard"}>Olá: {user?.name}</Link>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}  
      <span className={styles.btnDown} onClick={() => actionDropDown()}>
        Intrumentos<FaAngleDown />
        <div className={`${styles.dropdown} ${downOpen ? styles.open : ""}`}>
          <Link to={"/products?q=guitarra"}>Guitarras</Link>
          <Link to={"/products?q=baixo"}>Baixos</Link>
          <Link to={"/products?q=bateria"}>Baterias</Link>
        </div>
      </span>
      {token ? (
        <button className={styles.btnLogout} onClick={logout}>Sair</button>
      ) : (
        ""
      )}
    </nav>
  )
}

export default Navbar