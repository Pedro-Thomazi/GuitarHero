const jwt = require("jsonwebtoken")

const User = require("../models/User")

const getUserByToken = async (token) => {
  // Se não vier um token, o usuário não podererá prosseguir
  if (!token) return res.status(401).json({ message: "Acesso negado!" })

  // Decodificação do token
  const decoded = jwt.verify(token, "nossosecret")
  // Coleta do id do usuário
  const userId = decoded.id

  // Get do usuário pelo id
  const user = await User.findOne({ _id: userId })
  // Retorna o usuário
  return user
}

module.exports = getUserByToken