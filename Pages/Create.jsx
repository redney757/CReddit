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

     const { createForum, user } = useContext(AuthContext);
     
    const handleForumCreation = async (formData) => {
        
        const forum = {
            subject: formData.get("subject"),
            body : formData.get("body"),
            createdBy: user.id,
            
        }
        await createForum(forum);
        console.log("Form submitted");
    }

    return (
            <div id='createMainDiv'>


        <h1> Create Forum</h1>
        <form id='createForum' action={handleForumCreation}>
            <div><input className='createInput' type="text" placeholder='Subject' name='subject'required /></div>
           <div> <input className='createInput' type='text' placeholder='Body' name='body' required/></div>
           <button type='submit'>Create Forum</button>



        </form>
    
        </div>
  )
}

export default Create
