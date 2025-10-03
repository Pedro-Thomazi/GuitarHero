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
  }
}