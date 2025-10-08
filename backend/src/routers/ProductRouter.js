const ProductController = require("../controllers/ProductController")

const router = require("express").Router()

router.post("/create", ProductController.create)


module.exports = router