const UserController = require("../controllers/UserController")

const router = require("express").Router()

router.get("/details", UserController.userDetails)
router.post("/register", UserController.registerUser)
router.post("/login", UserController.login)

module.exports = router