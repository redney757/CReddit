import { useState } from 'react'
import '../src/App.css'
import mainLogo from '../src/assets/CReddit_Logo.png'
import { useContext } from 'react';
import { AuthContext } from '../Context/Context.jsx';
function Login() {
    const { loginExistingUser } = useContext(AuthContext);
    const handleLogin = async (formData) => {
        
        const existingUser = {
            usernameOrEmail : formData.get("usernameOrEmail"),
            password: formData.get("password")
        }
        await loginExistingUser(existingUser);
        console.log("Form submitted");
    }

  return (
    <>
    <img src={mainLogo} alt="Logo" id='img'/>
    <form id='form' action={handleLogin}>
        <h1>Login</h1>
        <div><input className='input' type='text' placeholder='Username or email' name='usernameOrEmail' /></div>
        <div><input className='input' type='password' placeholder='Password' name='password' /></div>
        <button id='submit' type='submit'>Login</button>
        <div><a href='/register'>Don't have an account? Register</a></div>
    </form>
    
    </>
  )
}

export default Login
