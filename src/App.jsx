import { useEffect } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import HomeNavigation from '../Components/HomeNavigation.jsx'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import HomeMainContent from '../Components/HomeMainContent.jsx'
import Account from '../Pages/Account.jsx'
import SingleForum from '../Pages/SingleForum.jsx'
import Solutions from '../Pages/Solutions.jsx'
import Messages from '../Pages/Messages.jsx'
function App() {
  const { token } = useContext(AuthContext); //retreives the token saved in context
  const { user } = useContext(AuthContext); // retreives the user saved in context
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) { // if there is no token and no user and the user is trying to access another route other than /login and /register, navigate them to login.
      if (location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login", { replace: true });
    }
   
  }
   
}, [token, user, navigate, location.pathname]);

  return (
    <>
    {/* if there is a token and a user they will be allowed to access the associated outes and the element <HomeNavigation/> otherwise they will only be allowed to access the /register and /login */}
    {token && user ? (
      <>
    <HomeNavigation/>
      <Routes>
        <Route path="/home" element={<HomeMainContent />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/forum/:id" element={<SingleForum/>}/>
        <Route path="/solutions" element={<Solutions/>}/>
        <Route path="/user/:id/messages" element={<Messages/>}/>
      </Routes>
       </>
          ) : (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        )}
    </>
  )
}

export default App
