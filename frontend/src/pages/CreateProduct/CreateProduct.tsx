import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import HeaderSecondary from '../../components/HeaderSecondary/HeaderSecondary'
import styles from './CreateProduct.module.css'
import { useNavigate } from 'react-router-dom'
import type { DataCreateProduct, DataImage } from '../../interfaces/ProductInterface'
import { useAuthContext } from '../../context/UserContext'

const CreateProduct = () => {
  const { authenticated, createProduct } = useAuthContext()
  const [token] = useState(localStorage.getItem("token") || "")
  const [product, setProduct] = useState<DataCreateProduct>({
    name: "",
    price: 0,
    description: ""
  })

  const [image, setImage] = useState<DataImage>()
  const [previewImg, setPreviewImg] = useState<File[]>([])
  const navigate = useNavigate()

  useEffect(() => {
  }, [token])

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setProduct({ ...product, [e.target.name]: [e.target.value] })
  }

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImg(Array.from(e.target.files))
      setImage(Array.from(e.target.files))
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!image) alert("Adicione uma imagem!")
    else createProduct(product, image, token, navigate)
  }


  if (!authenticated) return navigate("/")

  return (
    <main className={styles.containerCreateProduct}>
      <HeaderSecondary />
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <h3>Criar Produto</h3>
          <div>
            <input type="text" onChange={handleChange} name='name' />
            <label htmlFor="name">Nome</label>
          </div>
          <div>
            <input type="text" onChange={handleChange} name='price' />
            <label htmlFor="price">Preço</label>
          </div>
          <div>
            <input type="text" onChange={handleChange} name='description' />
            <label htmlFor="description">Descrição</label>
          </div>
          <div>
            <input type="file" multiple onChange={handleImage} name='images' />
            <label htmlFor="images">Imagem</label>
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    </main>
  )
}

export default CreateProduct