import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'


export const NavBar = () => {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)
    const history = useHistory()

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }


    useEffect(() => {
        showButton();
    }, [])


    window.addEventListener('resize', showButton)

    return (
        <>
            <nav id="navbar" className='navbar sticky-top' style={{ background: "#282c34" }}>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu} >
                        MC Classics

                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/help' className='nav-links' onClick={closeMobileMenu} >
                                Help Requests
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profiles/currentuser' className='nav-links' onClick={closeMobileMenu}>
                                My Profile
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                                Projects
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/events' className='nav-links' onClick={closeMobileMenu}>
                                Events
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link className='nav-links' to="/login" onClick={() => {
                                localStorage.clear()
                            }}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

