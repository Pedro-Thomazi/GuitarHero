const BuyController = require("../controllers/BuyController")

const router = require("express").Router()

// Middlewares
const checkToken = require("../middleware/verify-token")


router.post("/buy-product/:id", checkToken, BuyController.requisitionToBuy)
// router.patch("/send-product/:id", checkToken, BuyController.update)


module.exports = router