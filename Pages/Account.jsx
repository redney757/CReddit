import { useState, useEffect, useContext } from 'react'
import '../src/Home.css'
import profilePicture from '../src/assets/userProfile.png'
import { AuthContext } from '../Context/Context'
import axios from 'axios';
function Account() {
  const { user } = useContext(AuthContext);
  const [ foraByOwner, setForaByOwner] = useState([]);
  const date = new Date(user.created_at).toDateString();
  useEffect( () => {
    const getForaByOwner = async () => {
      const response = await axios.get(`http://localhost:8080/account/${user.id}/fora`)
      setForaByOwner(response.data);
    }
    getForaByOwner()
  }, [])

  return (
    <>
      <div id='AccountMainDiv'>
        <header id='accountHeader'>
          <div id='profileWrap'><img src={profilePicture} alt="ProfilePicture" id='profilePicture'/><p id='usernameTag'>u/{user.username}</p>
          <p>{user.firstName} {user.lastName}</p>
          <p>{date}</p>
          
          <p>{user.created_at}</p>
          

          <p id='emailTag'>{user.email}</p>
          </div>
          
        </header>
        
        <div id='accountForaDiv'>
          <div id='accountWrapper'>
          {foraByOwner.map(forum=> <div className='accountForumItem' key={forum.id}>
            
            
            
            <h4>{forum.subject}</h4>
            <p>{forum.body}</p>

            </div>)}
            
            </div>
            <div id="accountLike">
              <p>likes go here</p>
            </div>
        </div>


      </div>
    </>
  )
}

export default Account
