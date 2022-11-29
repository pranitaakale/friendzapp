import React, { useState } from 'react';
import axios from 'axios';
import bg_logo from '../assets/bg_logo.svg'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Signup(props) {
    const navigate = useNavigate()
    
    const [userData, setUserData] = useState({
        uEmail : '',
        uPhone : '',
        uPassword : '',
        uCPassword : ''
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setUserData({
            ...userData, 
            [name]:value
        })
    }

    const emailValidation = (uEmailString) => {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        return emailRegex.test(uEmailString)
        // return true
    }

    const phoneValidation = (uPhoneString) => {
        var phRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
      
        return phRegex.test(uPhoneString)
    }

    const passwordValidation = (uPwdString) => {
            var lowerCase = /[a-z]/g
            var upperCase = /[A-Z]/g
            var nums = /[0-9]/g
            var min_len = 8
            
            // if(uPwdString.length < min_len)
            //     return false
            // if(!uPwdString.match(lowerCase))
            //     return false
            // if(!uPwdString.match(upperCase))
            //     return false
            // if(!uPwdString.match(nums))
            //     return false
            
            return true
    }
    
    const {uEmail, uPhone, uPassword, uCPassword} = userData
    const loginUser = () => {
        if(uEmail && uPhone && uPassword && uCPassword){
            if(!emailValidation(uEmail)){
                alert("Invalid Email")
                return
            }
            if(!phoneValidation(uPhone)){
                alert("Invalid Phone")
                return
            }
            if(uPassword != uCPassword){
                alert("Passwords don't Match")
                return
            }
            if(!passwordValidation(uPassword)){
                alert("Invalid Password")
                return
            }
            axios.post("http://localhost:5000/signup",userData )
            .then(
                res=>
                {
                    if(res.data.isValid){
                        alert("User Registeration is Successful")
                        navigate(`/login`)
                    }
                },
                err => {
                    alert(err.response.data)
                })
                           
        }
        else{
            alert("Please enter all the details")
        }
    }

    return (
        <div>
            {/* <div className="bg-logo">
                <img src={bg_logo} alt="" />
            </div> */}
           <div className="main-signup">
                    <h1>SignUp</h1>
                    <label htmlFor="">Email : </label>
                   <input type="text" name="uEmail" value={ userData.uEmail } onChange={ handleChange } />
                   <label htmlFor="">Phone Number : </label>
                   <input type="text" name="uPhone" value={ userData.uPhone } onChange={ handleChange } />
                   <label htmlFor="">Password : </label>
                   <input type="password" name="uPassword" value={ userData.uPassword } onChange={ handleChange }  />
                   <label htmlFor="">Confirm Password : </label>
                   <input type="password" name="uCPassword" value={ userData.uCPassword } onChange={ handleChange }  />
                   <button onClick={ loginUser } className="cta-01">Signup</button>
                   <p>Already have an account? <Link to="/login">Login</Link></p>
           </div>
        </div>
    );
}



export default Signup;