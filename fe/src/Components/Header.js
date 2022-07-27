import { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { renderHeader } from '../Interceptor/routers'

function Header({data}) {
    return (
        <header className="p-3 bg-dark text-white">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 fs-4 
                    fw-bold text-warning text-uppercase">Home</Link></li>
                </ul>
                <div className="text-end">
                    { renderHeader(data) }
                </div>
            </div>
        </header>
    )
}

export default Header