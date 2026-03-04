import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './MyCart.module.css'
import { useEffect, useState } from 'react'
import type { User } from '../../interfaces/UserInterface'
import { useAuthContext } from '../../context/UserContext'
import axios from 'axios'
import type { Cart } from '../../interfaces/Cart'

const MyCart = () => {
  const { authenticated } = useAuthContext()
  const [token] = useState(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()
  const [userCart, setUserCart] = useState<Cart>()
  const navigate = useNavigate()


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
    <main className={styles.containerMyCart}>
      <Header />
      <section>
        <h3>Meus pedidos</h3>

        <div className={styles.pedidos}>
          <div className={styles.pedido}>
            <div className={styles.detailsBuy}>
              <p>Pedido realizado <br /> 22 de fevereiro de 2026</p>
              <p>Total <br /> R$123,45</p>
              <p className={styles.space}>Enviado para <br /> <span>Usuário</span></p>
              <p>Pedido N∘ 123123-123123-12312</p>
            </div>
            <div className={styles.imageAndDetails}>
              <h4>Chegará no dia 40 de Dezembro</h4>
              <div>
                <img src="/" alt="Imagem produto" />
                <Link to={'/'}>Nome do produto</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyCart