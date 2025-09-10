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
    const [thread, setThread] = useState([])
    const forumId = useParams()
    const [replyMessage, setReplyMessage] = useState(false)
    const [parentMessageID, setParentMessageID] = useState(null)
    const [replyToUser, setReplyToUser] = useState(null)
    const { user, token, commentReply} = useContext(AuthContext)

    function createAMessageTree(messageItems) {
        const map = new Map()
        messageItems.forEach(message => map.set(message.id, {...message, children: []}));
        const rootMessageItems = []
        messageItems.forEach(message => {
            const objects = map.get(message.id)
            if(message.parent_id && map.has(message.parent_id)) {
                map.get(message.parent_id).children.push(objects)
            } else {
                rootMessageItems.push(objects)
            }

        })
        const sortMessageTree = objects => {
            objects.sort((first, last) => (first.created_at || 0) > (last.created_at || 0) ? 1 : -1)
            objects.forEach(object => object.children && sortMessageTree(object.children))
        }
        sortMessageTree(rootMessageItems)
        return rootMessageItems
    }







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
                setThread(createAMessageTree(response.data))
                // const allChildren = []
                // console.log(response.data.reduce((finalArr, message)=> {
                //     if (!message.parent_id) {
                //         const parentObj = {}
                //         parentObj.parentMessage = message
                //         finalArr.push(parentObj)
                        
                //     } else {
                //         let parentId = message.parent_id
                //         const parent = finalArr.find((parent) =>parent.parentMessage.id===parentId)
                //         const index = allChildren.indexOf(parentId)
                //         parentId = parent.length > 0 ? parentId : allChildren[index]
                //         console.log(parent)
                //         parent.children = []
                //         parent.children.push(message)
                //         allChildren.push(message.parent_id)
                //     }
                //     return finalArr
                // },[]))

              
            }
            getFora()
            getForumMessages()
        },[ replyMessage, forum])
        function displayMessageObjects(object, depth = 0) {
            return (
                <div key={object.id} style={{marginBottom : 12, marginLeft: depth ? 16 : 0, borderLeft: depth ? '1px solid #ddd' : 'none', paddingLeft: depth ? 12 : 0}}>
                    <div id='flexDivForMessage' style={{display: 'flex', justifyContent: 'space-between', gap: 8}}>
                        <p style={{margin: 0}}>
                            <span style={{fontSize: 12, opacity: 0.8, display: 'block'}}>
                                {object.author_username ?? 'userDeleted'}

                            </span>
                            {object.body}

                        </p>
                        <button onClick={()=> {
                                         setReplyMessage(true)
                                         setParentMessageID(object.id)
                                         setReplyToUser(object.author_username)
                                         
                        }}>reply</button>
                    </div>
                    {object.children && object.children.length > 0 && (
                        <div style={{marginTop: 8}}>
                            {object.children.map(child => displayMessageObjects(child, depth + 1))}

                        </div>
                    )}
                </div>
            )
        }
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
                            {thread.map(rootMessage => displayMessageObjects(rootMessage))}
                            
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
