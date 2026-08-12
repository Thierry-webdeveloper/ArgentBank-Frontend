import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { requestLogout } from '../features/user/userSlice'
import { ROUTES } from '../config/routes.js'

function Navbar() {
  const token = useSelector((state) => state.user.token)
  const profile = useSelector((state) => state.user.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = (e) => {
    e.preventDefault()
    dispatch(requestLogout())     // token intact : la garde de Profile ne réagit pas
    navigate(ROUTES.HOME)
  }

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
              <i className="fa fa-user-circle"></i> {profile?.userName}
            </Link>
            <Link className="main-nav-item" to={ROUTES.HOME} onClick={handleSignOut}>
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