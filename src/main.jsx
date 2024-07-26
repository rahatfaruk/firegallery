import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery'
import ErrorPage from './pages/ErrorPage'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AuthProvider from './context/AuthProvider.jsx'

// defining routes 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<ErrorPage/>} >
      <Route index element={<Home/>} />
      <Route path='gallery' element={<Gallery/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
