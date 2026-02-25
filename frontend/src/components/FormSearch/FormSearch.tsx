import { FaSearch } from 'react-icons/fa'
import styles from './FormSearch.module.css'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const FormSearch = () => {
  const [query, setQuery] = useState<string>("")
  const navigate = useNavigate()

  function search(e: FormEvent) {
    e.preventDefault()

    navigate("/products?q=" + query)
  }

  return (
    <form onSubmit={search} className={styles.form}>
      <input type="search" onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} name="search" id="search" placeholder='Buscar...' />
      <button><FaSearch size={20} /></button>
    </form>
  )
}

export default FormSearch