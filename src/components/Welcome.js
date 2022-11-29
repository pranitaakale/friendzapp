import React from 'react';
import { Link } from "react-router-dom"
import bg_logo from '../assets/bg_logo.svg'

function Welcome(props) {
    return (
        <div>
            <div className="bg-logo">
                <img src={bg_logo} alt="" />
            </div>
            <div className="main-wel">
                <h1>Welcome</h1>
                <div className='wel-links'>
                    <a><Link to="/login">Login</Link></a>
                    <a><Link to="/signup">Signup</Link></a>
                </div>
            </div>
        </div>
    );
}

export default Welcome;