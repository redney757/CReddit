import { useState, useEffect, useContext } from 'react'
import '../src/Account.css'
import profilePicture from '../src/assets/userProfile.png'
import { AuthContext } from '../Context/Context'
import axios from 'axios';
function Account() {
  const { user } = useContext(AuthContext);
  const [ foraByOwner, setForaByOwner] = useState([]);
  const date = new Date(user.created_at).toDateString();
  useEffect( () => {
    const getForaByOwner = async () => {
      const response = await axios.get(`https://retekprojects.com:8443/account/${user.id}/fora`)
      setForaByOwner(response.data);
    }
    getForaByOwner()
  }, [])

  return (
    <>
      <div id='AccountMainDiv'>
        
        <header id='accountHeader'>
          <h1 id='accountTitle'>Account Info</h1>
          <div id='profileWrap'><img src={profilePicture} alt="ProfilePicture" id='profilePicture'/><p id='usernameTag'>u/{user.username}</p>
          <p>{user.firstName} {user.lastName}</p>
          <p>{date}</p>
          
       
          

          <p id='emailTag'>{user.email}</p>
          </div>
          
        </header>
        
        <div id='accountForaDiv'>
          <div id='accountWrapper'>
            <h2 id='createdByTitle'>Created by you:</h2>
          {foraByOwner.map(forum=> <div className='accountForumItem' key={forum.id}>
            
            
            
            <h4 id='forumTitle'><p id='forumPrefix'>cr/</p>{forum.subject}</h4>
            <button>&#129120;</button>
            </div>)}
            
            </div>
            <div id="accountLike">
              <h2 id='createdByTitle'>Liked by you:</h2>

              <p>likes go here</p>
            </div>
        </div>


      </div>
    </>
  )
}

export default Account
