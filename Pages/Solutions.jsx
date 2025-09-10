import { useState, useEffect } from 'react'
import '../src/App.css'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import HomeNavigation from '../Components/HomeNavigation.jsx'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import HomeMainContent from '../Components/HomeMainContent.jsx'
import Account from '../Pages/Account.jsx'
import axios from 'axios'
function Create() {

   

    return (
            <div id='createMainDiv'>

    
        </div>
  )
}

export default Create
