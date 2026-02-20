import Logo from '../Logo/Logo'
import Navbar from '../Navbar/Navbar'
import styles from './HeaderSecondary.module.css'

const HeaderSecondary = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  )
}

export default HeaderSecondary