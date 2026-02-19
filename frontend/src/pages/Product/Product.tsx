import { useEffect, useState } from 'react'
import styles from './Product.module.css'
import type { Product } from '../../interfaces/ProductInterface'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:5050/products/${id}`);
      const data = await res.json();
      setProduct(data.product)
    };

    load();
  }, [])

  return (
    <main className={styles.containerProduct}>
      {/* <Header /> */}
      <section>
        <div className={styles.images}>
          <img className={styles.principalImg} src={`http://localhost:5050/images/product/${product?.images}`} alt={`Foto imagem: ${product?.name}`} />
          <div className={styles.othersImgs}>
            <img src="/" alt="/" />
            <img src="/" alt="/" />
            <img src="/" alt="/" />
          </div>
        </div>
        <div className={styles.details}>
          <h3>{product?.name}</h3>
          <p className={styles.price}>R${product?.price}</p>
          <p className={styles.priceParcela}>12x de R${product?.price}</p>

          <button className={styles.btnbuy}>Comprar</button>

          <p className={styles.descriptions}>{product?.description}</p>
        </div>
      </section>
    </main>
  )
}

export default ProductPage