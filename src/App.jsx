

import { useContext } from 'react'
import './App.css'
import { AuthContext } from './context'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import Home from './pages/Home'
import ChangePassword from './pages/ChangePassword'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/Notfound'

function App() {

  const { token } = useContext(AuthContext)



  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* <Route path='/' element={ token ? <Dashboard /> : <Navigate to="/login" />} /> */}

        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path='/create-post' element={token ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to="/login" /> } />
        <Route path='/change-password' element={token ? <ChangePassword /> : <Navigate to="/login" /> } />
        <Route path='/forgot-password' element={<ForgotPassword  />} />
        <Route path='/reset-password/:token' element={token ? <ResetPassword /> : <Navigate to="/login" /> } />
        <Route path='*' element={<NotFound />} />


      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
