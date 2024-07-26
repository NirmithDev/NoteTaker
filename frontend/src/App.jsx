import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout(){
  localStorage.clear();
  return <Navigate to='/Login'></Navigate>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<RegisterAndLogout/>}></Route>
      <Route path='/Contact' element={<Contact/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
