import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button} from 'react-bootstrap'


function NavBar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar' style={{ background: "#282c34" }}>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu} >
                        MC Classics
                        
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                                My Profile
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/projects' className='nav-links' onClick={closeMobileMenu}>
                                My Projects
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/events' className='nav-links' onClick={closeMobileMenu}>
                                My Events
                            </Link>
                        </li>

                        <li>
                            <Link to='/register' className='nav-links-mobile'>
                                Sign Up
                            </Link>
                        </li>
                    </ul>

                           {button && <Button variant='secondary' href='/register' >Sign Up</Button>}
                    
                </div>
            </nav>
        </>
    );
}

export default NavBar;