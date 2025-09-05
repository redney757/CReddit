import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Home.css'
import axios from 'axios'
function HomeMainContent() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [fora, setFora] = useState([])

        useEffect(()=> {
            const getFora = async() => {
                const response = await axios.get("http://localhost:8080/fora")
                setFora(response.data)
                console.log(response.data)
                
            }
            getFora()
        },[fora])
  const filteredFora = fora.filter(forum => forum.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
  forum.body.toLowerCase().includes(searchTerm.toLowerCase())
)
    

            
    
  return (
    
        <div id='homeMainContent'>
              <div id='forumSearchDiv'>
                        <button id='createForum' type='submit' onClick={(e)=>{
                          e.preventDefault()
                          navigate("/create")
                        }}>+</button>
                        <div id='centerSearch'>
                        <input type='text' value={searchTerm} id='forumSearch' onChange={(e)=> {
                          setSearchTerm(e.target.value)
                        }} placeholder='Search..' title='Search for a forum'/>
                  </div>
              </div>
                <div id='forumGrid'>
                      {filteredFora.map(forum=><div onClick={()=>{setSelected(forum)

                        navigate(`/forum/${forum.id}`)
                      
                      }} className='forumItem' key={forum.id}>
                        <h3>cr/{forum.subject}</h3>
                        <p>{forum.author_username}</p>
                        <p>{forum.body}</p>



                      </div>)}
                </div>
            </div>

       
  )
}

export default HomeMainContent;


