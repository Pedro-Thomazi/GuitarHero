import type { NavigateFunction } from "react-router-dom"
import type { DataCreateProduct, DataImage } from "../interfaces/ProductInterface"


export default function useProduct() {
  async function createProduct(
    product: DataCreateProduct,
    image: DataImage,
    token: string,
    navigate: NavigateFunction
  ) {
    const formData = new FormData()

    try {
      formData.append("name", product.name)
      formData.append("description", product.description)
      formData.append("price", String(product.price))

      if (image && image.length > 0) {
        Array.from(image).forEach(file => {
          formData.append("images", file)
        })
      } else {
        alert("Selecione pelo menos 1 imagem!")
      }

      await fetch("http://localhost:5050/products/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
        body: formData
      })

      for(const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`)
      }
      await navigate("/")
    } catch (error) {
      console.log("Erro na criação do Produto: " + error)
      alert("Erro na criação do Produto!")
    }
  }



  return {
    createProduct
  }
}