const createUserToken = require("../helpers/create-user-token")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports = class UserController {
  // Função de criação de usuário
  static async registerUser(req, res) {
    const {name, email, password, confirmPassword} = req.body

    // Validações de usuário
    if (!name) {
      res.status(422).json({message: "Nome é obrigatório"})
      return
    }
    if (!email) {
      res.status(422).json({message: "E-mail é obrigatório"})
      return
    }
    if (!password) {
      res.status(422).json({message: "Senha é obrigatória"})
      return
    }
    if (!confirmPassword) {
      res.status(422).json({message: "Confirmação de senha é obrigatória"})
      return
    }

    if (password !== confirmPassword) {
      res.status(422).json({message: "Senhas não compatíveis."})
      return
    }

    const checkUserExists = await User.findOne({email: email})

    if (checkUserExists) {
      res.status(422).json({message: "E-mail já utilizado."})
      return
    }

    // cRIPTOGRAFANDO SENHA DO USUÁRIO
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // Preenchendo a classe de criação do User
    const user = new User({
      name,
      email,
      notification: [],
      userCart: [],
      password: passwordHash
    })

    // Criando usuário no banco de dados
    try {
      const newUser = await user.save()
      // Criar token do usuário
      await createUserToken(newUser, req, res)
    } catch (err) {
      console.error("Erro ao criar usuário: " + err)
      res.status(500).json({message: err})
    }
  }
}