import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './MyCart.module.css'
import { useEffect, useState } from 'react'
import type { User } from '../../interfaces/UserInterface'
import { useAuthContext } from '../../context/UserContext'
import axios from 'axios'
import type { Cart } from '../../interfaces/Cart'
import { formatePrice } from '../../utils/Functions'

const MyCart = () => {
  const { authenticated } = useAuthContext()
  const [token] = useState(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()
  const [userCart, setUserCart] = useState<Cart[]>([])
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
      axios.get("http://localhost:5050/buy/get-buy-user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((res) => {
        setUserCart(res.data.reqsBuy)
      })
    }

  }, [token])

  return (
    <main className={styles.containerMyCart}>
      <Header />
      <section>
        <h3>Meus pedidos</h3>

        <div className={styles.pedidos}>
          {userCart.map((item, index) => (
            <div key={index} className={styles.pedido}>
              <div className={styles.detailsBuy}>
                <p>Pedido realizado <br /> {item.dateBuy}</p>
                <p>Total <br /> {formatePrice(item.price)}</p>
                <p className={styles.space}>Enviado para <br /> <span>{item.user.name}</span></p>
                <p>Pedido N∘ {item._id}</p>
              </div>
              <div className={styles.imageAndDetails}>
                <h4>Chegará no dia 40 de Dezembro</h4>
                <div>
                  <img src={`http://localhost:5050/images/product/${item.image}`} alt={`Foto imagem: ${item.product.name}`} />
                  <Link to={`/produto/${item.product.name}/${item.product._id}`}>{item.product.name}</Link>
                </div>
              </div>
            </div>
          ))}
          {!userCart && (
            <div className={styles.pedido}>
              <p>Sem asdasd</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default MyCart