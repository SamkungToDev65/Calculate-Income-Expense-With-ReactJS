import React from 'react'
import "./Navbar.css"
function Navbar() {
  return (
    <header className="header">
    <a href="https://futureskill.co/" target='_blank' className="logo-link">
      <img src="https://business.futureskill.co/fs-logo-light.png" alt="logo" width={175} />
    </a>
  </header>
  )
}

export default Navbar