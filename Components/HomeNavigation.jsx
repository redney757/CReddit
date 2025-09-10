import { useEffect, useState } from 'react'
import '../src/App.css'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Link, Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Navigation.css'
import mainLogo from '../src/assets/CReddit_Logo.png'

function HomeNavigation() {
const {user} = useContext(AuthContext)
 

  return (
    <>
    <div id='homeNav'>
        <div id='navImageDiv'>
            <img src={mainLogo} alt="Logo" id='navLogo'/>
        </div>
        
        
        <nav>
           <Link id='navLink' to="/account">My Account</Link>
           <Link id='navLink' to={`/user/${user.id}/messages`}>Messages</Link>
           <Link id='navLink' to="/">Forums</Link>
           <Link id='navLink' to="/solutions">Solutions</Link>
        </nav>
    </div>
    
    </>
  )
}

export default HomeNavigation;


