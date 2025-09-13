import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Link, Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Navigation.css'
import mainLogo from '../src/assets/CReddit_Logo.png'

function HomeNavigation() {
const {user,} = useContext(AuthContext)
const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("this function was ran")
        window.location.reload();
    }
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
        <div id='logoutDiv'>
          <label id='userLabelfffffff'> Logged in as: {user.username}</label>
          <button id='logoutButton' onClick={()=> logoutUser()}>Logout</button>
        </div>
    </div>
    
    </>
  )
}

export default HomeNavigation;


