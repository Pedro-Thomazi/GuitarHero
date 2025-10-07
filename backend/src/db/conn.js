const mongoose = require("mongoose")

async function main() {
  // Conecta com o banco de dados
  await mongoose.connect("mongodb://0.0.0.0:27017/guitarhero")
  console.log("Conectado com o mongoose.")
}

main().catch((err) => {
  console.log("Erro ao conectar com obanco de dados: " + err)
})

module.exports = mongoose