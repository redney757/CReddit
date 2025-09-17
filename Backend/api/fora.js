import express from "express";
import { getUserById} from "../Database/Queries/login.js"; 
const router = express.Router();
import { createForum, getFora, getForum, createMainMessage, getForumMessages, createRelyMessage } from "../Database/Queries/fora.js";
export default router;

// route to get all fora
router.route("/").get(async (req, res, next) => {
    try {
       const forums = await getFora()
        
       return res.send(forums)
        
    }catch(e) {
        console.log(e)
    }
    
})
//route to create a forum
router.route("/forum/create").post(async (req, res) => {
    try {
        if(!req.body) {
            return res.status(400).send("Request must have a body")
        }
        const subject = req.body.subject
        const body = req.body.body
        const id = Number(req.body.createdBy)
        
        if (!subject || !body) {
            return res.status(400).send()
        }
        
        
        const user = await getUserById({id})
        console.log(user)
           
        if (!user) {
            return res.status(401).send("user is required to post a forum")
        }
        const forum = await createForum({subject, body, id})
        
        return  res.status(201).send(forum) 
    }catch(e) {
       console.log(e)
    }
    
})
//route to get a forum based on the ID in the url parameters
router.route("/forum/:id").get(async (req, res, next) => {
    try {
        
        const forumId = parseInt(req.params.id)
       const forum = await getForum(forumId)
       return res.send({forum})
        
    }catch(e) {
        console.log(e)
    }
    
})
//route to get a forums messages based on the id in the url parameters
router.route("/forum/:id/messages").get(async (req, res, next) => {
    try {
        
        const forumId = parseInt(req.params.id)
        const forumMessages = await getForumMessages(forumId)
       
       return res.send(forumMessages)
        
    }catch(e) {
        console.log(e)
    }
    
})
// route to handle message (sending) on a particular forum
router.route("/forum/:id/messages").post(async (req, res, next) => {
    try {
        
        const forumId = parseInt(req.params.id)
        const forumIDFromReq = parseInt(req.body.forum_id)
        const authorID = parseInt(req.body.author_id)
        const parent_id = parseInt(req.body.parent_id)
        const body = req.body.body
        console.log(authorID)
        console.log(forumIDFromReq)
        console.log(req.body)
        console.log(forumId)
        if (!req.body.parent_id) {
            const forumMessage = await createMainMessage(forumIDFromReq, authorID, body)
        res.status(201).send(forumMessage)
        } else if (req.body.parent_id) {
            const forumMessage = await createRelyMessage(forumIDFromReq, parent_id, authorID, body)
        res.status(201).send(forumMessage)
        }
        
    }catch(e) {
        console.log(e)
    }
    
})