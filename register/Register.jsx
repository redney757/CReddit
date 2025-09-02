import { useState } from 'react'
import '../src/App.css'
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
    <>
    <img src={mainLogo} alt="Logo" id='img'/>
    <form id='form' action={handleRegistration}>
        <h1>Register</h1>
        <div><input className='input' type='text' placeholder='First Name' name='firstName' /></div>
        <div><input className='input' type='text' placeholder='Last Name' name='lastName' /></div>
        <div><input className='input' type='text' placeholder='Username' name='username' /></div>
        <div><input className='input' type='email' placeholder='Email' name='email' /></div>
        <div><input className='input' type='password' placeholder='Password' name='password' /></div>
        <button id='submit' type='submit'>Register</button>
        <div><a href='/login'>Already have an account? Login</a></div>
    </form>
    
    </>
  )
}

export default Register
