import { Link } from 'react-router-dom'
import type { Product } from '../../interfaces/ProductInterface'
import styles from './CardProduct.module.css'
import { useState } from 'react'
import { formatePrice, formatParcela } from '../../utils/Functions'

interface Datatype {
  data: Product
}

const CardProduct = ({ data }: Datatype) => {
  return (
    <Link to={`/produto/${data.name}/${data._id}`} className={styles.cardContainer}>
      <img src={`http://localhost:5050/images/product/${data.images[0]}`} alt={`Foto imagem: ${data.name}`} />
      <span>COMPRAR</span>
      <h3>{data.name}</h3>
      <p>{formatePrice(data.price)}</p>
      <p className={styles.priceParcela}>12x de {formatParcela(data.price)} sem juros</p>
    </Link>
  )
}

export default CardProduct