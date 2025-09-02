import express from "express";
import { registerNewUser } from "../Database/Queries/register.js";
const router = express.Router();
import jwt from 'jsonwebtoken'
export default router;
const secret = process.env.SECRET

router.route("/").post(async (req, res) => {
    try {
        const parameters = {firstName : req.body.firstName, 
                lastName : req.body.lastName,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            }
        


            const newUser = await registerNewUser(parameters)
           
            res.status(201).send(newUser)
    }catch(e) {

    }
    
})