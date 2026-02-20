import { Link } from 'react-router-dom'
import type { Product } from '../../interfaces/ProductInterface'
import styles from './CardProduct.module.css'
import { useState } from 'react'

interface Datatype {
  data: Product
}

const CardProduct = ({ data }: Datatype) => {
  let formatPrice
  let priceParceladoFormat
  if (data.price) {
    formatPrice = data.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let parcela = data.price / 12
    priceParceladoFormat = parcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
  
  return (
    <Link to={`/produto/${data.name}/${data._id}`} className={styles.cardContainer}>
      <img src={`http://localhost:5050/images/product/${data.images[0]}`} alt={`Foto imagem: ${data.name}`} />
      <span>COMPRAR</span>
      <h3>{data.name}</h3>
      <p>{formatPrice}</p>
      <p className={styles.priceParcela}>12x de {priceParceladoFormat} sem juros</p>
    </Link>
  )
}

export default CardProduct