import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
        <html data-theme="dracula"></html>
        <NavBar />
        <Outlet />
        <Footer />
        <div></div>
    </div>
  )
}

export default Body
