const BuyController = require("../controllers/BuyController")

const router = require("express").Router()

// Middlewares
const checkToken = require("../middleware/verify-token")


router.get("/get-buy-user", checkToken, BuyController.getRequisitionToBuy)
router.post("/buy-product/:id", checkToken, BuyController.requisitionToBuy)
// router.patch("/send-product/:id", checkToken, BuyController.update)


module.exports = router