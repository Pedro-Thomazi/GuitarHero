import { useSearchParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './SearchPage.module.css'
import ContainerProducts from '../../components/ContainerProducts/ContainerProducts'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q")
  console.log(typeof query)

  return (
    <main className={styles.searchContainer}>
      <Header />
      <section>
        <h2 className={styles.title}>Busca por {query}</h2>
        <ContainerProducts query={query} />
      </section>
    </main>
  )
}

export default SearchPage