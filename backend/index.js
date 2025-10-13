const express = require("express")
// Conexão com o Front
const cors = require("cors")
const port = 5050

const app = express()
app.use(express.json())

const UserRouter = require("./src/routers/UserRouter")
app.use("/user", UserRouter)

const ProductRouter = require("./src/routers/ProductRouter")
app.use("/products", ProductRouter)

app.listen(port, () => console.log("Conectando na porta: " + port))