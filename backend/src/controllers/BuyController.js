const ObjectId = require("mongoose").Types.ObjectId
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const Buy = require("../models/Buy")
const Product = require("../models/Product")
const User = require("../models/User")

module.exports = class BuyController {

  static async getRequisitionToBuy(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const userCart = user.userCart

    // CONTINUAR DAQUI -- COLETAR O ID DA REQBUY E MOSTRAR TODAS AS REQS QUE O USER FEZ
  }

  static async requisitionToBuy(req, res) {
    const id = req.params.id
    const product = await Product.findOne({ _id: id })

    const token = getToken(req)
    const user = await getUserByToken(token)

    const { quantity } = req.body

    if (!quantity) {
      res.status(422).json({ message: "Adicione a quantidade de produtos que você vai comprar!" })
      return
    }

    if (product.inStock && user) {
      const buyReq = new Buy({
        price: product.price,
        image: product.images[0],
        quantity,
        dateBuy: new Date(Date.now()).toLocaleDateString('pt-BR'),
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
        product: {
          id: product._id,
          name: product.name,
        }
      })
      try {
        const createBuyReq = await buyReq.save()
        await User.findByIdAndUpdate(user._id, { $push: { userCart: createBuyReq._id } })
        res.status(201).json({ message: "Pedido feito! Aguarde...", createBuyReq })
      } catch (error) {
        res.status(404).json({ message: "Ocorreu um erro no seu pedido!" })
      }
    } else {
      res.status(500).json({ message: "Produto fora de estoque!" })
    }


  }
}