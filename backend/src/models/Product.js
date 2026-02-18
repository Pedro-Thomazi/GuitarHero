const mongoose = require("../db/conn")
const { Schema } = mongoose

const Product = mongoose.model(
  "Product",
  new Schema({
    name: {
      type: String,
      require: true
    },
    images: {
      type: Array,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    description: {
      type: String
    },
    inStock: {
      type: Boolean,
      require: true
    },
    user: Object
  }, {timestamps: true})
)

module.exports = Product