import styles from './Logo.module.css'

// Imagem Logo
import logoImg from "../../assets/images/imgLogo.png"
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={"/"} className={styles.containerLogo}>
      <img src={logoImg} alt="Logo GuitarHero" />
      <h1><span>Guitar</span>Hero</h1>
    </Link>
  )
}

export default Logo
