import { useState } from 'react'
import mainLogo from '../src/assets/CReddit_Logo.png'
import { useContext } from 'react';
import '../src/Login.css'
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
    <div id='LoginBlock'>
    <img src={mainLogo} alt="Logo" id='logo'/>
    <form id='form' action={handleLogin}>
        <h1>Login</h1>
        <div id='inputDiv'><input className='input' type='text' placeholder='Username or email' name='usernameOrEmail' /></div>
        <div id='inputDiv'><input className='input' type='password' placeholder='Password' name='password' /></div>
        <button id='submit' type='submit'>Login</button>
        <div><a id='registerLink' href='/register'>Don't have an account? Register</a></div>
    </form>
    
    </div>
  )
}

export default Login
