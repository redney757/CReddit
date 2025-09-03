import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Home.css'
import axios from 'axios'
function HomeMainContent(id, subject, body, createdAt, createdBy) {
    const [fora, setFora] = useState([]

    )

        useEffect(()=> {
            const getFora = async() => {
                const response = await axios.get("http://localhost:8080/fora")
                setFora(response.data)
            }
            getFora()
        },[])
        
        

            
    
  return (
    <div id='homeMainContent'>
        <input type='text' id='forumSearch' onKeyUp={""} placeholder='Search..' title='Search for a forum'/>
        <div id='forumGrid'>
              {fora.map(forum=><div key={forum.id}>
                <h1>{forum.subject}</h1>
                <h1>{forum.body}</h1>



              </div>)}
        </div>
    </div>
  )
}

export default HomeMainContent;


