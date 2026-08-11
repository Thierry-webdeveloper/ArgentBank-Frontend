import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import AccountItem from '../components/AccountItem.jsx'
import { ROUTES } from '../config/routes.js'

function Profile() {
  const token = useSelector((state) => state.user.token)

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          <button type="button" className="edit-button">
            Edit Name
          </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <AccountItem
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <AccountItem
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <AccountItem
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
      <Footer />
    </>
  )
}

export default Profile