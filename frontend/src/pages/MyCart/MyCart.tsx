import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import styles from './MyCart.module.css'
import { useState } from 'react'
import type { User } from '../../interfaces/UserInterface'
import { useAuthContext } from '../../context/UserContext'

const MyCart = () => {
  const { authenticated } = useAuthContext()
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()


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