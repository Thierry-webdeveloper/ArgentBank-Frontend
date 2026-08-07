import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Profile from './pages/Profile.jsx'
import { ROUTES } from './config/routes.js'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<SignIn />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
    </Routes>
  )
}

export default App