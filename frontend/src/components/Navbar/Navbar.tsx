import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react';
import type { User } from '../../interfaces/UserInterface';
import { useAuthContext } from '../../context/UserContext';
import axios from 'axios';

const Navbar = () => {
  const { authenticated } = useAuthContext()
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
      {!authenticated ? (
        <p>Ola: {user?.name}</p>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
      
      <Link className={styles.btnDown} to={"#"} onClick={() => actionDropDown()}>
        Intrumentos<FaAngleDown />
        <div className={`${styles.dropdown} ${downOpen ? styles.open : ""}`}>
          <Link to={"/"}>Guitarras</Link>
          <Link to={"/"}>Baixos</Link>
          <Link to={"/"}>Baterias</Link>
        </div>
      </Link>
      <Link to={"/"}>Login</Link>
    </nav>
  )
}

export default Navbar