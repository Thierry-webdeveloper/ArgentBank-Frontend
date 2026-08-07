import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../features/user/userSlice'
import { ROUTES } from '../config/routes.js'

function Navbar() {
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={ROUTES.HOME}>
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to={ROUTES.PROFILE}>
              <i className="fa fa-user-circle"></i> Tony
            </Link>
            <Link className="main-nav-item" to="/" onClick={() => dispatch(logout())}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to={ROUTES.LOGIN}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar