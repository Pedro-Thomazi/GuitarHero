import CarrosselImgs from '../../components/CarrosselImgs/CarrosselImgs'
import ContainerProducts from '../../components/ContainerProducts/ContainerProducts'
import Header from '../../components/Header/Header'
import styles from './Home.module.css'

const Home = () => {
  return (
    <main className={styles.containerHome}>
      <Header />
      <CarrosselImgs />
      <h2 className={styles.title}>Produtos em destaque</h2>
      <ContainerProducts query='guitarra' />
      <h2 className={styles.title}>Baixos Elétricos</h2>
      <ContainerProducts query='baixo' />
      <h2 className={styles.title}>Bateias</h2>
      <ContainerProducts query='bateria' />
    </main>
  )
}

export default Home