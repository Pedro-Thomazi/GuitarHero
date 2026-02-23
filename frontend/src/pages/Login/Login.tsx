import { useState, type ChangeEvent, type FormEvent } from 'react';
import styles from './Login.module.css'

// Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import type { UserLogin } from '../../interfaces/UserInterface';
import useAuth from '../../hooks/useAuth';


const Login = () => {
  // Funções
  const { authenticated, login } = useAuth()
  const navigate = useNavigate()

  // INFO USER
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: ""
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

  if (authenticated) navigate("/")

  // Form Actions
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    login(user, navigate)
  }

  return (
    <main className={styles.loginCotaianer}>
      <section>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Entrar" />
        </form>

        <p className={styles.linkChangePage}>Ainda não tem uma conta? <Link to={"/"}>Clique Aqui!</Link></p>
      </section>
    </main>
  )
}

export default Login