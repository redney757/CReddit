import { useState, useEffect } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import HomeNavigation from '../Components/HomeNavigation.jsx'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import HomeMainContent from '../Components/HomeMainContent.jsx'
import Account from '../Pages/Account.jsx'
import Create from '../Pages/Create.jsx'
import SingleForum from '../Pages/SingleForum.jsx'
import Solutions from '../Pages/Solutions.jsx'
function App() {
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      if (location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login", { replace: true });
    }
  }
}, [token, user, navigate, location.pathname]);

  return (
    <>
    {token && user ? (
      <>
    <HomeNavigation/>
      <Routes>
        <Route path="/" element={<HomeMainContent />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/forum/:id" element={<SingleForum/>}/>
        <Route path="/solutions" element={<Solutions/>}/>
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
