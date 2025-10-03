const jwt = require("jsonwebtoken")

// Recebe os dados do usuário
async function createUserToken(user, req, res) {
  // Criando token
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, "nossosecret")

  res.status(200).json({ message: "Autenticado", token })
}

module.exports = createUserToken