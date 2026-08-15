import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { loginUser } from '../features/user/userSlice.js'
import { ROUTES } from '../config/routes.js'

const REMEMBER_ME_KEY = 'argentbank_remember_me'
const REMEMBERED_EMAIL_KEY = 'argentbank_remembered_email'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState(() => {
    const storedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
    return storedRememberMe ? localStorage.getItem(REMEMBERED_EMAIL_KEY) || '' : ''
  })
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(
    () => localStorage.getItem(REMEMBER_ME_KEY) === 'true'
  )
  const status = useSelector((state) => state.user.status.login)
  const error = useSelector((state) => state.user.error)
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    if (token) {
      navigate(ROUTES.PROFILE)
    }
  }, [token, navigate])

    const handleRememberMeChange = (e) => {
    const checked = e.target.checked
    setRememberMe(checked)
    if (!checked) {
      // Décochage immédiat : on efface tout de suite, sans attendre
      // un éventuel submit, conformément au scénario où l'utilisateur
      // coche puis décoche avant même de se connecter.
      localStorage.removeItem(REMEMBER_ME_KEY)
      localStorage.removeItem(REMEMBERED_EMAIL_KEY)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(loginUser({ email, password }))

    if (loginUser.fulfilled.match(resultAction) && rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true')
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email)
    }
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* Affichage du message d'erreur (state.user.error) */}
            {status === 'failed' && (
              <div className="error-message">
                <br></br>
                {error}
              </div>
            )}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default SignIn