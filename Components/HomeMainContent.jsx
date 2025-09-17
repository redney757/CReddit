import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Create from '../Pages/Create.jsx'
function HomeMainContent() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState() // holds the value of the selected forum
  const [searchTerm, setSearchTerm] = useState('') // holds the value of the search (input)
  const [fora, setFora] = useState([]) // holds the value of all fora received in the use effect
  const {isCreating, setIsCreating} = useState(false)
        useEffect(()=> {
            const getFora = async() => {
                const response = await axios.get("https://retekprojects.com:8443/fora")
                setFora(response.data)
                
            }
            getFora()
        },[fora]) // continuously monitors the for state variable for changes to re-render the page if anything new were to be added

        //variable created for filtering out al fora based on what the user searches
  const filteredFora = fora.filter(forum => forum.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
  forum.body.toLowerCase().includes(searchTerm.toLowerCase())
)
    

            
    
  return (
        
        <div id='homeMainContent'>
          <Create/>
              <div id='forumSearchDiv'>
                        <button id='createForumButton' type='submit' onClick={(e)=>{
                          e.preventDefault()
                          
                          const createElement = document.querySelector('.createMainDiv')
                          if(createElement) {
                            createElement.classList.add('show')
                          
                        }
                        }}>+</button>
                        <div id='centerSearch'>
                          {/* saves users input( value ) as the searchTerm in state */}
                        <input type='text' value={searchTerm} id='forumSearch' onChange={(e)=> {
                          setSearchTerm(e.target.value)
                        }} placeholder='Search..' title='Search for a forum'/>
                  </div>
              </div>
                <div id='forumGrid'>
                  {/* maps the filtered fora based on the searchTerm */}
                      {filteredFora.map(forum=><div onClick={()=>{setSelected(forum)
                      // navigates the user when the click on the div to the url containing the mapped forum ID
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


