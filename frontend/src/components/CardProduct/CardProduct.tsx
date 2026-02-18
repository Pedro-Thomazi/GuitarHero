import { Link } from 'react-router-dom'
import type { Product } from '../../interfaces/ProductInterface'
import styles from './CardProduct.module.css'

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

  console.log(data.price)
  return (
    <Link to={"/"} className={styles.cardContainer}>
      {data.images.map((img, index) => (
        <img key={index} src={`http://localhost:5050/images/product/${img}`} alt={`Foto imagem: ${img}`} />
      ))}
      <span>COMPRAR</span>
      <h3>{data.name}</h3>
      <p>{formatPrice}</p>
      <p className={styles.priceParcela}>12x de {priceParceladoFormat} sem juros</p>
    </Link>
  )
}

export default CardProduct