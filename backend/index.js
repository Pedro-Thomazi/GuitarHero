const express = require("express")
// Conexão com o Front
const cors = require("cors")
const port = 5050

const app = express()

app.listen(port, () => console.log("Conectando na porta: " + port))