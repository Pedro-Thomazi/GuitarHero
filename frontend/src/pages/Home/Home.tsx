import CarrosselImgs from '../../components/CarrosselImgs/CarrosselImgs'
import ContainerProducts from '../../components/ContainerProducts/ContainerProducts'
import Header from '../../components/Header/Header'
import styles from './Home.module.css'

const Home = () => {
  return (
    <main className={styles.containerHome}>
      <Header />
      <CarrosselImgs />
      <ContainerProducts query='guitarra' />
    </main>
  )
}

export default Home