import type { Product } from '../../interfaces/ProductInterface'
import styles from './CardProduct.module.css'

interface Datatype {
  data: Product
}

const CardProduct = ({data}: Datatype) => {
  console.log(data.images)
  return (
    <div className={styles.cardContainer}>
      {data.images.map((img, index) => (
        <img key={index} src={`http://localhost:5050/uploads/images/product/${img}`} alt="" />
      ))}
      <h3>{data.name}</h3>
    </div>
  )
}

export default CardProduct