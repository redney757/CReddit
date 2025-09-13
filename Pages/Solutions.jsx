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
  const [categories, setCategories] = useState([])
   useEffect(  ()=> {
    const getSolutions = async () => {
      const response = await axios.get("http://localhost:8080/solutions")
      setSolutions(response.data)
       const alreadyThere = new Set();
    const newArr = [];
    for (let i = 0; i < solutions.length; i++) {
      const item = solutions[i];
      if(!alreadyThere.has(item.category)) {
        alreadyThere.add(item.category)
        newArr.push(item);
      }
    }
    setCategories(newArr)
    }
    getSolutions()
   },[categories])

   
    return (
            <div id='solutionsMainDiv'>
              <div id='wrapper'>
              <button id='selectCategoryButton' type='button' onClick={()=> {
                const categoriesElement = document.querySelector('.categoriesDiv')
                if (categoriesElement) {
                  categoriesElement.classList.add('show')
                }
              }}>{category ? <p>{category}</p> : <p>Select a category</p>}</button>
              <div className='categoriesDiv'>
                {categories.map(category => <div className='categoryList' key={category.id} onClick={()=> setCategory(category.category)}>
                  <h2>{category.category}</h2>
                </div>)}
              </div>
              </div>
              <div id='solutionWrapper'>

              {solutions.map(solution => <div id='solution' key={solution.id}>
                <h1>{solution.category}</h1>
                <p>{solution.part}</p>
                <p>{solution.repair_solution}</p>
                <p>{solution.estimated_cost}</p>
              </div>)}
                </div>



                
              

    
        </div>
  )
}

export default Solutions
