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
import '../src/SingleForum.css'
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
        function calculatePostTime(dateString) {
            const dateNow = new Date()
            const datePast = new Date(dateString)
            const calcDifference = Math.floor((dateNow - datePast) / 1000)
            if (calcDifference < 60) {
                return "just now"
            } else if (calcDifference < 3600) {
                return Math.floor(calcDifference / 60) + " min ago"
            } else if (calcDifference < 86400) {
                return Math.floor(calcDifference / 3600) + " hr ago"
            } else if (calcDifference >= 86400) {
                return Math.floor(calcDifference / 86400) + " d ago"
            } else if (calcDifference >= 2592000) {
                return Math.floor(calcDifference / 2592000) + " mo ago"
            } else if (calcDifference >= 31536000) {
                return Math.floor(calcDifference / 31536000) + " yr ago"
            }
            return dateString
        }
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
                        <button id='replyToButton' onClick={()=> {
                                         setReplyMessage(true)
                                         setParentMessageID(object.id)
                                         setReplyToUser(object.author_username)
                                        document.getElementById('inputReply').focus()

                                         
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
                    <header id='forumHeader'>
                        <div>
                            <div id='infoWrapper'>
                            <h3 id='forumSubject'><p id='subjectPrefix'>cr/</p>{forum.subject}</h3>
                         <ul id='forumInfoList'>
                             <li id='postTime'>{calculatePostTime(forum.created_at)}</li>
                            </ul>
                        </div>
                             <h6 id='forumAuthor'><p id='authorPrefix'>u/</p>{forum.author_username} </h6>
                            
                       
                        <p id='forumBody'>{forum.body}</p>
                        </div>
                        <div id='commentButtonWrapper'>
                        <button id='comment' onClick={(e)=> {
                        
                            e.preventDefault()
                            document.getElementById('inputReply').focus()
                        
                        }}>comment</button>
                        </div>
                    </header>
                    <div id='commentReplyDiv'>
                        <div id='commentReplyGrid'>
                            <>
                            {
                                
                                thread.length <=0 ?
                                    <h3 id='beFirst'>Be the first to reply to this forum!</h3>
                                :
                            thread.map(rootMessage => displayMessageObjects(rootMessage))

                            }
                            
                            </>
                        </div>
                    
                    </div>
                    <div id='replyingToDiv'>
                    <p className={`reply ${replyMessage ? 'show' : ''}`}>Replying to message ID: {replyToUser}</p>
                    <button className={`cancel ${replyMessage ? 'show' : ''}`} type='button' onClick={()=>{
                        setReplyMessage(false)
                        setParentMessageID(null)
                        setReplyToUser(null)
                        const replyElement = document.getElementsByClassName('reply show')
                        const cancelElement = document.getElementsByClassName('cancel show')
                        Array.from(cancelElement).forEach(element => element.classList.remove("show"))
                        Array.from(replyElement).forEach(element => element.classList.remove("show"))
                    }}>cancel</button>
                    </div>
                    <div id='formDiv'>
                   <form id='inputCommentReplyForm' action={handleCommentReply}>
                       
                        <button id='submitCommentReply'type="submit" onClick={()=> {
                           
                        }}>Submit</button> 
                       
                        <div id='inputWrap'>
                            
                               
                            <input id='inputReply' type='text' placeholder='Message...' name='messageBody' required></input>
                        </div>
                        
                    </form>
                    </div>
                
        </div>
  )
}

export default SingleForum
