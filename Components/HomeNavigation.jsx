import { Link } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Navigation.css'
import mainLogo from '../src/assets/CReddit_Logo.png'

function HomeNavigation() {
const {user,} = useContext(AuthContext)
// function that removes the items from the users local storage and reloads the page so the user is visually taken back to the login page
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
          <div id='linkWrap'>
          {/* links in the navigation pane, also appear in html as <a></a> tags */}
           <Link id='navLink' to="/account">My Account</Link>
           <Link id='navLink' to={`/user/${user.id}/messages`}>Messages</Link>
           <Link id='navLink' to="/home">Forums</Link>
           <Link id='navLink' to="/solutions">Solutions</Link>
           </div>
           <div id='logoutDiv'>
          <label id='userLabel' > Logged in as: {user.username}</label>
          <button id='logoutButton' onClick={()=> logoutUser()}>Logout</button>
        </div>
        </nav>
        
    </div>
    
    </>
  )
}

export default HomeNavigation;


