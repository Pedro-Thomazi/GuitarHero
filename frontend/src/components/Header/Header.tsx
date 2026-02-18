import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  )
}

export default Header