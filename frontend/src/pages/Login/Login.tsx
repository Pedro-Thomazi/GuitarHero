import styles from './Login.module.css'

const Login = () => {
  return (
    <main className={styles.loginCotaianer}>
      <section>
        <h3>Login</h3>
        <form>
          <div>
            <input type="email" name="email" id="email" required />
            <label htmlFor="">E-mail</label>
          </div>
          <div>
            <input type="password" name="password" id="password" required />
            <label htmlFor="">Senha</label>
          </div>
          <button>Entrar</button>
        </form>
      </section>
    </main>
  )
}

export default Login