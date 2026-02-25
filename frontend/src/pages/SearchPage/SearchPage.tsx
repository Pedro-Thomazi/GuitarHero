import { useSearchParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './SearchPage.module.css'
import ContainerProducts from '../../components/ContainerProducts/ContainerProducts'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")

  return (
    <main className={styles.searchContainer}>
      <Header />
      <h2 className={styles.title}>Busca por </h2>
      <ContainerProducts query={query} />
    </main>
  )
}

export default SearchPage