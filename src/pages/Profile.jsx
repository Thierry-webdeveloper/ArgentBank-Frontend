import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import AccountItem from '../components/AccountItem.jsx'
import { fetchProfile, updateUserName, resetUserNameStatus } from '../features/user/userSlice.js'
import { ROUTES } from '../config/routes.js'

function Profile() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const profile = useSelector((state) => state.user.profile)
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile())
    }
  }, [token, dispatch])

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  const enterEditMode = () => {
    setUserName(profile?.userName || '')
    setIsEditing(true)
  }

  const exitEditMode = () => {
    // Annulation volontaire par l'utilisateur : on efface un éventuel
    // résidu d'une tentative précédente (ex. un échec affiché) avant
    // de fermer, pour repartir propre à la prochaine ouverture.
    dispatch(resetUserNameStatus())
    setIsEditing(false)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const resultAction = await dispatch(updateUserName(userName))

    if (updateUserName.fulfilled.match(resultAction)) {
      dispatch(resetUserNameStatus())
      setIsEditing(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        {isEditing ? (
          <div className="header">
            <h1>Edit user info</h1>
            <form className="edit-user-form" onSubmit={handleFormSubmit}>
              <div className="input-wrapper">
                <label htmlFor="userName">User name:</label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={profile?.firstName || ''}
                  disabled
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={profile?.lastName || ''}
                  disabled
                />
              </div>
              <div className="edit-button-group">
                <button type="submit" className="edit-button">
                  Save
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={exitEditMode}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {profile?.userName}!
            </h1>
            <button
              type="button"
              className="edit-button"
              onClick={enterEditMode}
            >
              Edit Name
            </button>
          </div>
        )}
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