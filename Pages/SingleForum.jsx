import { useEffect, useState } from 'react'
import Register from '../register/Register.jsx'
import Login from '../login/Login.jsx'
import { Route, Routes } from 'react-router'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../Context/Context.jsx';
import '../src/Home.css'
import axios from 'axios'
import { useParams } from 'react-router'

function SingleForum() {
    const [forum, setForum] = useState([])
    const [messages, setMessages] = useState([])
    const forumId = useParams()
    const [replyMessage, setReplyMessage] = useState(false)
    const [parentMessageID, setParentMessageID] = useState(null)
    const [replyToUser, setReplyToUser] = useState(null)
    const { user, token, commentReply} = useContext(AuthContext)
    const handleCommentReply = async (formData) => {
        const id = forumId.id
        const forumProperties = {
            forum_id : forumId.id,
            author_id : user.id,
            body : formData.get("messageBody")

        }
        const forumPropertiesWParent = {
            forum_id : forumId.id,
            parent_id : Number(parentMessageID),
            author_id : user.id,
            body : formData.get("messageBody")

        }
        

        if (!replyMessage) {
            await commentReply(id, forumProperties)
            console.log('ran without reply')

        } else if (replyMessage) {
            await commentReply(id, forumPropertiesWParent)
            setReplyMessage(false)
            console.log('ran with reply')
        }
         
    }
    useEffect(()=> {
            const getFora = async() => {
                const response = await axios.get(`http://localhost:8080/fora/forum/${forumId.id}`)
                setForum(response.data.forum)

            }
            const getForumMessages = async() => {
                const response = await axios.get(`http://localhost:8080/fora/forum/${forumId.id}/messages`)
                setMessages(response.data)
              
            }
            getFora()
            getForumMessages()
        },[forum, messages, replyMessage])
        
    return (
            <div id='singleForumDiv'>
                
                    <h1>cr/{forum.subject}</h1>
                    <p>{forum.author_username}</p>
                    <p>{forum.body}</p>
                    <button id='comment' onClick={(e)=> {
                        e.preventDefault()
                        document.getElementById('inputReply').focus()
                       
                    }}>comment</button>

                    <div id='commentReplyDiv'>
                        <div id='commentReplyGrid'>
                            {messages.map(message=><div id='messageItem' key={message.id}>
                                <div id='flexDivForMessage'>
                                    <p>{message.body}</p>
                                    <button onClick={()=> {
                                         setReplyMessage(true)
                                         setParentMessageID(message.id)
                                         setReplyToUser(message.author_username)
                                         
                                    }}>reply</button>
                                </div>
                            </div>)}
                            
                        </div>

                    </div>
                    <form id='inputCommentReplyForm' action={handleCommentReply}>
                       
                        <button id='submitCommentReply'type="submit" onClick={()=> {
                           
                        }}>Submit</button> 
                       
                        <div id='inputWrap'>
                            <div id='replyMessageInfo'> 
                                {
                            replyMessage ? <p>Replying to message ID: {replyToUser}</p> : null
                        }
                            <input id='inputReply' type='text' placeholder='Message...' name='messageBody' required></input>
                            </div>
                        </div>
                        
                    </form>
                    
                
        </div>
  )
}

export default SingleForum
