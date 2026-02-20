import { Link } from 'react-router-dom'
import { FaAngleDown } from "react-icons/fa";
import styles from './Navbar.module.css'
import { useState } from 'react';

const Navbar = () => {
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
      <Link to={"/login"}>Login</Link>
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