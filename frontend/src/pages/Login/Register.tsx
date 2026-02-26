import { useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './Login.module.css'
import type { UserLogin, UserRegister } from '../../interfaces/UserInterface'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuthContext } from '../../context/UserContext'

const Register = () => {
  // Funções
  const { authenticated, login, register } = useAuthContext()
  const navigate = useNavigate()

  // INFO USER
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [typeInputPass, setTypeInputPass] = useState<string>("password")
  const [showEye, setShowEye] = useState("")
  const [hideEye, setHideEye] = useState(styles.hide)

  function showPass() {
    setTypeInputPass("text")
    setShowEye(styles.hide)
    setHideEye("")
  }

  function hidePass() {
    setTypeInputPass("password")
    setShowEye("")
    setHideEye(styles.hide)
  }

  // Form Actions
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    register(user, navigate)
  }

  if (authenticated) navigate("/")

  return (
    <main className={styles.loginCotaianer}>
      <section>
        <h3>Registra-se</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input onChange={handleChange} type="text" name="name" id="name" required />
            <label htmlFor="name">Nome</label>
          </div>
          <div>
            <input onChange={handleChange} type="email" name="email" id="email" required />
            <label htmlFor="email">E-mail</label>
          </div>
          <div>
            <input onChange={handleChange} type={typeInputPass} name="password" id="password" required />
            <label htmlFor="password">Senha</label>
            <FaEye onClick={showPass} className={showEye} size={25} />
            <FaEyeSlash onClick={hidePass} className={hideEye} size={25} />
          </div>
          <div>
            <input onChange={handleChange} type={typeInputPass} name="confirmPassword" id="confirmPassword" required />
            <label htmlFor="confirmPassword">Confirmação de Senha</label>
            <FaEye onClick={showPass} className={showEye} size={25} />
            <FaEyeSlash onClick={hidePass} className={hideEye} size={25} />
          </div>
          <input type="submit" value="Entrar" />
        </form>

        <p className={styles.linkChangePage}>Já tem uma conta? <Link to={"/login"}>Clique Aqui!</Link></p>
      </section>
    </main>
  )
}

export default Register