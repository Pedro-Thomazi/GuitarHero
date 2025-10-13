const ProductController = require("../controllers/ProductController")

const router = require("express").Router()
// Helpers
const { imageUpload } = require("../helpers/upload-image")

// Middlewares
const checkToken = require("../middleware/verify-token")

router.get("/", ProductController.getAllProductS)
router.get("/:id", ProductController.getProductById)
router.post("/create", checkToken, imageUpload.array("images"), ProductController.create)
router.delete("/remove-stock/:id", checkToken, ProductController.removeStock)


module.exports = router