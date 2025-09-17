import express from "express";
import { registerNewUser } from "../Database/Queries/register.js";
const router = express.Router();
export default router;
//route that handles registering a user, this is a post reuest so the request will have a body
router.route("/").post(async (req, res) => {
    try {
        if(!req.body) { // if there are no values in the body, the function will return a message
            return res.status(400).send("Request must have a body")
        }
        // destructure the body into an object of parameters
        const parameters = {firstName : req.body.firstName, 
                lastName : req.body.lastName,
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            }
            //if there are no parameters send an error message
        if (!parameters) {
            return res.status(400).send()
        }

        // run the async function to register a new user with the parameters from the body
        const newUser = await registerNewUser(parameters)
           
            res.status(201).send(newUser) 
    }catch(e) { // check to see if a user exists or send an internal server error message
        if (e && (e.code === "23505" || /unique/i.test(String(e.message)))) { //had to do a lot of googling on this one
    return res.status(400).send("User Already Exists");
  }
  return res.status(500).send("Internal Server Error");
    }
    
})