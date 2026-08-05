import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser, logout, fetchProfile, updateUserName } from '../features/user/userSlice'
import '../styles/main.css'

function Home() {
  const dispatch = useDispatch()

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
           </Link>
        </div>
      </nav>

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <div className="feature-item">
            <img src="/img/icon-chat.png" alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </div>
          <div className="feature-item">
            <img src="/img/icon-money.png" alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </div>
          <div className="feature-item">
            <img src="/img/icon-security.png" alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </div>
        </section>

        {/* Boutons de test Redux, à retirer une fois les vraies pages connectées */}
        <button type="button" onClick={() => dispatch(loginUser({ email: 'tony@stark.com', password: 'password123' }))}>
          Tester le login Redux
        </button>
        <button type="button" onClick={() => dispatch(fetchProfile())}>
          Tester le fetchProfile Redux
        </button>
        <button type="button" onClick={() => dispatch(updateUserName('Iron'))}>
          Tester updateUserName Redux
        </button>
        <button type="button" onClick={() => dispatch(logout())}>
          Tester le logout Redux
        </button>
      </main>

      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  )
}

export default Home