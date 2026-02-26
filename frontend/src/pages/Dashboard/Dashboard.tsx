import { Link, useNavigate } from 'react-router-dom'
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary'
import styles from './Dashboard.module.css'
import { useEffect, useState } from 'react'
import type { User } from '../../interfaces/UserInterface'
import axios from 'axios'
import type { Product } from '../../interfaces/ProductInterface'
import { FaPencilAlt, FaTrashAlt, FaCrown } from "react-icons/fa";
import { formatePrice } from '../../utils/Functions'

const Dashboard = () => {
  const [token] = useState(localStorage.getItem("token") || "")
  const [user, setUser] = useState<User>()
  const [products, setProducts] = useState<Product[]>([])
  const [showDropDown, setShowDropDown] = useState<boolean>(false)
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
    axios.get("http://localhost:5050/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      setProducts(res.data.products)
    })
  }, [token])

  function updateProduct() {
    alert("Atualizar")
  }

  function deleteProduct() {
    alert("Deletar")
  }

  useEffect(() => {
    if (!user?.statusAdmin) navigate("/") 
  }, [token])

  return (
    <main className={styles.dashboardContainer}>
      <HeaderSecondary />
      <section>
        <h2>Olá: {user?.name} - {user?.statusAdmin && (<span>Admin. <FaCrown /></span>)}</h2>
        <Link className={styles.linkCreateProd} to={"/create-product"}>Criar Produto</Link>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Produto</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{formatePrice(product.price)}</td>
                <td>100</td>
                {product.inStock ? (
                  <td>Disponível</td>
                ) : (
                  <td>Esgotado</td>
                )}
                <td className={styles.actionsProd}>
                  <FaPencilAlt className={styles.pencil} size={20} onClick={updateProduct} />
                  <FaTrashAlt className={styles.trash} size={20} onClick={deleteProduct} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default Dashboard