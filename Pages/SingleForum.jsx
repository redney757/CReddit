import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Home.css'
import axios from 'axios'
import { useParams } from 'react-router'

function SingleForum() {
    const [forum, setForum] = useState([])
    const forumId = useParams()
   
   
        useEffect(()=> {
            const getFora = async() => {
                const response = await axios.get(`http://localhost:8080/fora/forum/${forumId.id}`)
                setForum(response.data)
            }
            getFora()
        },[])

    return (
            <div id='singleForumDiv'>
                
                    <h1>{forum.subject}</h1>
                    <p>{forum.body}</p>
                
        </div>
  )
}

export default SingleForum
