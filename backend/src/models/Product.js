const mongoose = require("../db/conn")
const { Schema } = mongoose

const Product = mongoose.model(
  "Product",
  new Schema({
    name: {
      type: String,
      require: true
    },
    image: {
      type: Array,
      require: true
    },
    description: {
      type: String
    },
    user: Object
  }, {timestamps: true})
)

module.exports = Product