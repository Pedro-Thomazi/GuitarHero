import { useState } from 'react'
import styles from './CardDeleteProduct.module.css'

interface Data {
  idProduct: string
  nameProduct: string
  open: boolean
}

const CardDeleteProduct = ({ idProduct, nameProduct, open }: Data) => {
  const [show, setShow] = useState<boolean>(open)

  function cancel() {
    setShow(false)
  }

  return (
    <div className={`${styles.containerCard} ${!show && styles.hide}`}>
      <div className={styles.content}>
        <h3>Você deseja remover do estoque: {nameProduct}</h3>
        <div>
          <button className={styles.deleteBtn}>REMOVER</button>
          <button className={styles.cancelBtn} onClick={() => cancel()}>CANCELAR</button>
        </div>
      </div>
    </div>
  )
}

export default CardDeleteProduct