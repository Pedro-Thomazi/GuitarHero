import { useEffect, useState } from 'react'
import styles from './Product.module.css'
import type { Product } from '../../interfaces/ProductInterface'
import { useParams } from 'react-router-dom'
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { formatePrice, formatParcela } from '../../utils/Functions'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()
  const [principalImg, setPrincipalImg] = useState<string>()
  const [indexImg, setIndexImg] = useState<number>(0)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:5050/products/${id}`);
      const data = await res.json();
      setProduct(data.product)
      setPrincipalImg(data.product.images[indexImg])
    };

    load();
  }, [])

  function changeImg(index: number): void {
    setPrincipalImg(product?.images[index])
    setIndexImg(index)
  }

  function prev() {
    if (!product?.images?.length) return
    setIndexImg((i) => {
      const nextIndex = (i - 1 + product.images.length) % product.images.length
      setPrincipalImg(product.images[nextIndex])
      return nextIndex
    });
  }

  function next() {
    if (!product?.images?.length) return
    setIndexImg((i) => {
      const nextIndex = (i + 1 + product.images.length) % product.images.length
      setPrincipalImg(product.images[nextIndex])
      return nextIndex
    });
  }

  return (
    <main className={styles.containerProduct}>
      <HeaderSecondary />
      <section>
        <div className={styles.images}>
          <img className={styles.principalImg} src={`http://localhost:5050/images/product/${principalImg}`} alt={`Foto imagem: ${product?.name}`} />
          <div className={styles.othersImgs}>
            {product?.images.map((img, index) => (
              <img onClick={() => changeImg(index)} src={`http://localhost:5050/images/product/${img}`} alt="/" />
            ))}
          </div>
          <div className={styles.btnsActions}>
            <button onClick={prev} className={styles.prev}><FaAngleLeft size={30} /></button>
            <button onClick={next} className={styles.next}><FaAngleRight size={30} /></button>
          </div>
        </div>
        <div className={styles.details}>
          <h3>{product?.name}</h3>
          <p className={styles.price}>{product && formatePrice(product?.price)}</p>
          <p className={styles.priceParcela}>12x de {product && formatParcela(product?.price)}</p>

          <button className={styles.btnbuy}>Comprar</button>

          <p className={styles.descriptions}>{product?.description}</p>
        </div>
      </section>
    </main>
  )
}

export default ProductPage