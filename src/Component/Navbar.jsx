import React from 'react'
import { Link } from 'react-router-dom'

export  function Navbar() {
  return (
    // <div>Navbar</div>
    <>
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
            <Link className="navbar-brand" to="login"><i _ngcontent-bse-c1="" className="far fa-sticky-note text-white fa-4"></i>  Notes</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link to="register" className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="login" className="nav-link">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </> 
  )
}
