import { useEffect, useState } from 'react'
import '../src/App.css'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';

function Home() {
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
    }
  }, [token, user, navigate]);

  return (
    <>
        {token && user ? (
            <h1>Welcome to the Home Page</h1>
        ) : (
            <h1>Please log in to access this page</h1>
        )}
    </>
  )
}

export default Home;


