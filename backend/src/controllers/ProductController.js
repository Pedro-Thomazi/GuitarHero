const ObjectId = require("mongoose").Types.ObjectId
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const Product = require("../models/Product")

module.exports = class ProductController {
  // GET All Products
  static async getAllProductS(req, res) {
    const products = await Product.find().sort("-createdAt")

    res.status(200).json({ products: products })
  }

  // GET Product By id
  static async getProductById(req, res) {
    const id = req.params.id
    const product = await Product.findOne({ _id: id })

    res.status(200).json({ product: product })
  }

  // POST para criação do Product
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
    const user = await getUserByToken(token)

    const product = new Product({
      name,
      description,
      images: [],
      inStock: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

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

  static async update(req, res) {
    const id = req.params.id
    const { name, description } = req.body
    const images = req.files

    const updateProduct = {}

    const product = await Product.findOne({ _id: id })
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado!" })
      return
    }

    // const token = getToken(req)
    // const user = await getUserByToken(token)

    if (!name) {
      res.status(422).json({ message: "Adicione o nome do produto!" })
      return
    } else {
      updateProduct.name = name
    }

    if (!description) {
      res.status(422).json({ message: "Adicione a descrição do produto!" })
      return
    } else {
      updateProduct.description = description
    }

    if (!images) {
      res.status(422).json({ message: "Adicione pelo menos uma foto!" })
      return
    }

    if (images.length > 0) {
      updateProduct.images = []
      images.map((img) => {
        updateProduct.images.push(img.filename)
      })
    }

    images.map((img) => {
      product.images.push(img.filename)
    })

    updateProduct.inStock = product.inStock

    try {
      const newProduct = await Product.findByIdAndUpdate(id, updateProduct)
      res.status(201).json({ message: "Produto modificado!", newProduct })
    } catch (error) {
      console.error("Erro ao modificar o produto: " + error)
      res.status(500).json({ message: error })
    }
  }

  // Remover do estoque
  static async removeStock(req, res) {
    // Get do produto pelo id
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "Id inválido!" })
      return
    }

    const product = await Product.findOne({ _id: id })
    if (!product) {
      res.status(404).json({ message: "Produto não encontrado!" })
      return
    }

    // Válidações do usuário
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (user.statusAdmin !== true) {
      res.status(422).json({ message: "Você não tem permissão para remover produtos do estoque!" })
      return
    }

    await Product.updateOne({ _id: id }, { $set: { inStock: false } })
    res.status(200).json({ message: "Produto fora do estoque!" })
  }


  // GETs separados [GUITARRAS - BAIXOS - BATERIAS, ...]
  static async getProductsByType(req, res) {
    const { q } = req.query

    if(!q) return res.json({message: "Produto não encontrado!"})

    
    const products = await Product.find({
      $or: [
        {name: {$regex: q, $options: "i"}},
        {description: {$regex: q, $options: "i"}}
      ]
    }).sort("-createdAt")

    res.status(200).json(products)
  }
}