const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const Product = require("../models/Product")

module.exports = class ProductController {
  static async create(req, res) {
    const { name, description } = req.body
    const images = req.files

    if (!name) {
      res.status(422).json({ message: "Adicione o nome do produto!" })
      return
    }

    if (!description) {
      res.status(422).json({ message: "Adicione a descrição do produto!" })
      return
    }

    if (!images) {
      res.status(422).json({ message: "Adicione pelo menos uma foto!" })
      return
    }

    const token = getToken(req)
    console.log("Token: " + token)
    const user = getUserByToken(token)

    console.log("User: " + user)

    const product = new Product({
      name,
      description,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

    // USUÁRIO NÃO ESTÁ INDO PARA O BANCO DO PRODUTO

    images.map((img) => {
      product.images.push(img.filename)
    })

    try {
      const newProduct = await product.save()
      res.status(201).json({ message: "Produto adicionado!", newProduct })
    } catch (error) {
      console.error("Erro aoadicionar um produto novo: " + error)
      res.status(500).json({ message: error })
    }
  }
}