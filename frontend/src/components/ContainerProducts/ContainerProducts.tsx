import { useEffect, useState } from 'react'
import styles from './ContainerProducts.module.css'
import type { Product } from '../../interfaces/ProductInterface'
import CardProduct from '../CardProduct/CardProduct'

interface TypeProp {
  query: string
}

const ContainerProducts = ({ query }: TypeProp) => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:5050/products/search?q=${query}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("ERRO: A API não retornou um array!", data);
        setProducts([]);
      }
    };

    load();
  }, [query]);
  return (
    <main className={styles.containerProducts}>
      {products.map((data, index) => (
        <CardProduct key={index} data={data} />
      ))}
    </main>
  )
}

export default ContainerProducts