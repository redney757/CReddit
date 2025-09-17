import { useState } from 'react'
import '../src/Register.css'
import mainLogo from '../src/assets/CReddit_Logo.png'
import { AuthContext } from '../Context/Context.jsx';
import { useContext } from 'react';
function Register() {
    const { registerNewUser } = useContext(AuthContext);
    const handleRegistration = async (formData) => {
        
        const newUser = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        }
        await registerNewUser(newUser);
        console.log("Form submitted");
    }

  return (
    <div id='RegisterBlock'>
    <img src={mainLogo} alt="Logo" id='logo'/>
    <form id='form' action={handleRegistration}>
        <h1>Register</h1>
        <div><input className='input' type='text' placeholder='First Name' name='firstName' required /></div>
        <div><input className='input' type='text' placeholder='Last Name' name='lastName' required /></div>
        <div><input className='input' type='text' placeholder='Username' name='username' required /></div>
        <div><input className='input' type='email' placeholder='Email' name='email' required /></div>
        <div><input className='input' type='password' placeholder='Password' name='password' required /></div>
        <button id='submit' type='submit'>Register</button>
        <div><a id='loginLink' href='/login'>Already have an account? Login</a></div>
    </form>
    
    </div>
  )
}

export default Register
