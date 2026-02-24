import { Link } from 'react-router-dom'
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary'
import styles from './Dashboard.module.css'
import { use, useEffect, useState } from 'react'
import type { User } from '../../interfaces/UserInterface'
import axios from 'axios'

const Dashboard = () => {
  const [token] = useState(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5050/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUser(res.data)
      })
    }

  }, [token])

  return (
    <main className={styles.dashboardContainer}>
      <HeaderSecondary />
      <section>
        <h2>Olá: {user?.name}</h2>
        <Link to={"/create-product"}>Criar Produto</Link>
      </section>
    </main>
  )
}

export default Dashboard