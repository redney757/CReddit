import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Create.css'
function Create() {

     const { createForum, user } = useContext(AuthContext); // Accesses 2 variables from context
     // function to create a forum with the info from the form data the user submitted
     const handleForumCreation = async (formData) => {
        //set these parameters for the request body
        const forum = {
            subject: formData.get("subject"),
            body : formData.get("body"),
            createdBy: user.id,
            
        }
        await createForum(forum);
        const mainElement = document.querySelectorAll('.createMainDiv')
            if (mainElement) {
                mainElement.forEach(element => element.classList.remove("show") )
            }
    }

    return (
            <div className="createMainDiv">
                

        <h1> Create Forum</h1>
        <form id='createForum' action={handleForumCreation}>
            <p>Subject</p>
            <div><textarea className='createInput' type="text" placeholder='Subject' name='subject' maxLength={250}  required /></div>
                <p>Body</p>
            <div> <textarea className='createInput' type='text' placeholder='Body' name='body' maxLength={1150} required/></div>
            <button id='submitCreation' type='submit'>Create</button>
            


        </form>
        <button onClick={()=>{
            const mainElement = document.querySelectorAll('.createMainDiv')
            if (mainElement) {
                mainElement.forEach(element => element.classList.remove("show") )
            }
        }}>Cancel</button>
        </div>
  )
}

export default Create
