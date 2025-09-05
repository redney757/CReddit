import express from "express";
import { getUserById, getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
import { createForum, getFora, getForum } from "../Database/Queries/fora.js";
export default router;
const secret = process.env.SECRET


router.route("/").get(async (req, res, next) => {
    try {
       const forums = await getFora()
        
       return res.send(forums)
        
    }catch(e) {
        console.log(e)
    }
    
})
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
router.route("/forum/:id").get(async (req, res, next) => {
    try {
        
        const forumId = parseInt(req.params.id)
        
       const forum = await getForum(forumId)
       return res.send(forum)
        
    }catch(e) {
        console.log(e)
    }
    
})