const ProductController = require("../controllers/ProductController")

const router = require("express").Router()
// Helpers
const { imageUpload } = require("../helpers/upload-image")

// Middlewares
const checkToken = require("../middleware/verify-token")

router.post("/create", checkToken, imageUpload.array("images"), ProductController.create)


module.exports = router