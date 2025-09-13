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
  const [elementStatus, setElementStatus]= useState(false)
  const [filteredItems, setFilteredItems] = useState ([])
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
      if (!category) {
        return
      } else {
        const newFilteredArray = []
        for (let i = 0; i < solutions.length; i++) {
          const item = solutions[i]
          if(item.category === category) {
            newFilteredArray.push(item)
          }
        }
        setFilteredItems(newFilteredArray)
      }
    }
    getSolutions()
   },[categories])
   
   
    return (
            <div id='solutionsMainDiv'>
              <div className='wrapper'>
              <button id='selectCategoryButton' type='button' onClick={()=> {
                const categoriesElement = document.querySelector('.categoriesDiv')
                const wrapperElement = document.querySelector('.wrapper')
                if (categoriesElement && wrapperElement && elementStatus === false) {
                  categoriesElement.classList.add('show')
                  wrapperElement.classList.add('show')
                  setElementStatus(true)
                }
                if (categoriesElement && wrapperElement && elementStatus === true) {
                  categoriesElement.classList.remove('show')
                  wrapperElement.classList.remove('show')

                  setElementStatus(false)
                }
              }}>{category ? <p>{category}</p> : <p>Select a category</p>}</button>
              <div className='categoriesDiv'>
                <p>Select A Category</p>
                {
                categories.map(category => <div className={`categoryList ${category.id}`} key={category.id} onClick={()=> {setCategory(category.category)}}>
                  <h2 id='categoryHeader' onClick={()=> {
                   const categoriesElement = document.querySelector('.categoriesDiv')
                  const wrapperElement = document.querySelector('.wrapper')
                  setCategory(category.category)
                  setElementStatus(false)
                  categoriesElement.classList.remove('show')
                  wrapperElement.classList.remove('show')

                  
               
                  }}>{category.category}</h2>
                </div>)}
              </div>
              </div>
              <div id='solutionWrapper'>

              {
                <>
                  { filteredItems.length === 0 ?            
                    solutions.map(solution => <div id='solution' key={solution.id}>
                    <h1>{solution.category}</h1>
                    <p>{solution.part}</p>
                    <p>{solution.repair_solution}</p>
                    <p>Average Cost: ${solution.estimated_cost}</p>
                  </div>)
                :
              
                      filteredItems.map(solution => <div id='solution' key={solution.id}>

                    <h1>{solution.part}</h1>
                    <p>{solution.repair_solution}</p>
                    <p>Average Cost: ${solution.estimated_cost}</p>


                      </div>)
              
                }
              </>
              }
                </div>



                
              

    
        </div>
  )
}

export default Solutions
