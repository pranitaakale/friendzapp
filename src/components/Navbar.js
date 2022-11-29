import React, { useState, useEffect } from 'react';
import nav_logo from '../assets/nav_logo.svg'
import profile_pic from '../assets/profile.png'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar(props) {
    const navigate = useNavigate()

    const [loginStatus, setLoginStatus] = useState(0)

    useEffect( () => {
        if('email' in localStorage && 'token' in localStorage){
            setLoginStatus(1)
        }
    })

    const userLogin = () => {
        navigate('/login')
    }

    const userLogout = (e) => {
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        navigate('/')
    }

  
    return (
        <div>
            <div className="main-nav">
                <div className="left-nav">
                    <img src={nav_logo} alt="" />
                    <h2>Friendz</h2>
                </div>
                <div className="right-nav">
                    { loginStatus ?
                    <div>
                    <button  className='profile-menu'>
                        <img src={profile_pic} alt="" />
                        <p>Me</p>
                    </button>
                    <div className="profile-menu-content">
                        <p><Link to="/profile">Profile</Link></p>
                        <p><button className='cta-02' onClick={ userLogout }>Logout</button></p>
                    </div>
                    </div>
                    : 
                    <div>
                        <button className='cta-02' onClick={userLogin}>Login</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;