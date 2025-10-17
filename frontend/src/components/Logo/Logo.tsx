import styles from './Logo.module.css'

// Imagem Logo
import logoImg from "../../assets/images/imgLogo.png"

const Logo = () => {
  return (
    <div className={styles.containerLogo}>
      <img src={logoImg} alt="Logo GuitarHero" />
      <h1><span>Guitar</span>Hero</h1>
    </div>
  )
}

export default Logo
