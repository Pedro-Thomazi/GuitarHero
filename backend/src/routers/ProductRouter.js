const ProductController = require("../controllers/ProductController")

const router = require("express").Router()
const { imageUpload } = require("../helpers/upload-image")

router.post("/create", imageUpload.array("images"), ProductController.create)


module.exports = router