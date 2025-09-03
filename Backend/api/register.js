import express from "express";
import { registerNewUser } from "../Database/Queries/register.js";
const router = express.Router();
import jwt from 'jsonwebtoken'
export default router;
const secret = process.env.SECRET

router.route("/").post(async (req, res) => {
    try {
        if(!req.body) {
            return res.status(400).send("Request must have a body")
        }
        const parameters = {firstName : req.body.firstName, 
                lastName : req.body.lastName,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            }
        if (!parameters) {
            return res.status(400).send()
        }
        const newUser = await registerNewUser(parameters)
           
            res.status(201).send(newUser) 
    }catch(e) {
        if (e && (e.code === "23505" || /unique/i.test(String(e.message)))) { //had to do a lot of googling on this one
    return res.status(400).send("User Already Exists");
  }
  return res.status(500).send("Internal Server Error");
    }
    
})