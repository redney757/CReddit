import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Home.css'
function HomeMainContent() {


  return (
    <div id='homeMainContent'>
        <input type='text' id='forumSearch' onKeyUp={""} placeholder='Search..' title='Search for a forum'/>
        <div id='forumGrid'>
              
        </div>
    </div>
  )
}

export default HomeMainContent;


