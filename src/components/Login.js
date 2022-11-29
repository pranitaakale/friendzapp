import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Login(props) {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        uEmail : '',
        uPassword : ''
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setUserData({
            ...userData, 
            [name]:value
        })
    }
    
    const {uEmail, uPassword} = userData
    const loginUser = () => {
        if(uEmail && uPassword){
            axios.post("http://localhost:5000/login",userData )
            .then(res=>
                {
                    var userEmail = res.data.getEmail
                    var userToken = res.data.getToken
                localStorage.setItem( 'email' , res.data.getEmail )
                localStorage.setItem('token' , res.data.getToken)
                localStorage.setItem('friends', res.data.userFriend)
                localStorage.setItem('sReqs', res.data.userOtReqs)
                localStorage.setItem('vReqs', res.data.userInReqs)
                localStorage.setItem('rejReqs', res.data.userRejReqs)
                 navigate(`/home`)
                })
        }
        else{
            // ALERT
            alert("Please enter all the details")
        }
    }

    return (
        <div>
           <div className="main-signup">
           <h1>Login</h1>
                    <label htmlFor="">Email</label>
                   <input type="text" name="uEmail" value={ userData.uEmail } onChange={ handleChange } />
                   <label htmlFor="">Password</label>
                   <input type="password" name="uPassword" value={ userData.uPassword } onChange={ handleChange }  />
                   <button onClick={ loginUser } className="cta-01">Login</button>
                   <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
           </div>
        </div>
    );
}

export default Login;