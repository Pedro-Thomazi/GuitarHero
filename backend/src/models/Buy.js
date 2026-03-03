const mongoose = require("../db/conn")
const { Schema } = mongoose

const Buy = mongoose.model(
  "Buy",
  new Schema({
    image: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    dateBuy: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    },
    product: Object,
    user: Object
  }, {timestamps: true})
)

module.exports = Buy