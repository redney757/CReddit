import { useState, useEffect } from 'react'
import '../src/Solutions.css'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import HomeNavigation from '../Components/HomeNavigation.jsx'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import HomeMainContent from '../Components/HomeMainContent.jsx'
import Account from '../Pages/Account.jsx'
import axios from 'axios'
function Solutions() {
  const [solutions, setSolutions] = useState([])
  const [category, setCategory] = useState('')
   useEffect(  ()=> {
    const getSolutions = async () => {
      const response = await axios.get("http://localhost:8080/solutions")
      setSolutions(response.data)
      console.log(response.data)
    }
    getSolutions()
   },[])

    return (
            <div id='solutionsMainDiv'>
              {solutions.map(solution => <div key={solution.id}>
                <h1>{solution.category}</h1>
              </div>)}
                



                
              

    
        </div>
  )
}

export default Solutions
