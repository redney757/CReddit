import express from "express";
import { getUserById, getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
import { createForum, getFora } from "../Database/Queries/fora.js";
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
        const parameters = {subject : req.body.subject, 
                body : req.body.body,
                createdBy : req.body.createdBy,
                
            }
        if (!parameters) {
            return res.status(400).send()
        }
        console.log(parameters)
        const user = await getUserById(parameters.createdBy)
        if (!user) {
            return res.status(401).send("user is required to post a forum")
        }
        const forum = await createForum(parameters)

           
        return  res.status(201).send(forum) 
    }catch(e) {
       console.log(e)
    }
    
})