import React from 'react'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './components/Login'
import NewUser from './components/NewUser'
function App() {
  const PMRkey = sessionStorage.getItem('PMRKey')
  return (
    <Router>
      <Navbar />
      <Routes>
        {PMRkey ? <Route path="/" element={<Dashboard />} /> : <Route path="/" element={<Login />} />}
        <Route path="new-user" element={<NewUser />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App