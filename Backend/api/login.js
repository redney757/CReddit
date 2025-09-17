import express from "express";
import { getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
export default router;
const secret = process.env.SECRET

// route to handle login functionality
router.route("/").post(async (req, res, next) => {
    try {
        if (!req.body.usernameOrEmail && !req.body.password){ // if no body send and error message
             return res.status(400).send("Username/email and password field are required")

        } else { //destructure the body into an object of parameters
            const destructuredUserInfo = { usernameOrEmail : req.body.usernameOrEmail, password : req.body.password}
            //fetch the user info by email or username
            const verifiedUser = await getUserByUsernameOrEmail(destructuredUserInfo)
                if (!verifiedUser) { // if no user found send error message
                    return res.status(401).send("Username or password is incorrect")
                }
            const token = jwt.sign({id:verifiedUser.id}, secret, {expiresIn: 3600}) // create a json web token containing the verified users id, the secret and an expiration time.
            //Only returns minimal info back to the front end
            const minimalInfo = { 
                id : verifiedUser.id,
                firstName : verifiedUser.first_name,
                lastName : verifiedUser.last_name,
                username : verifiedUser.username,
                email : verifiedUser.email,
                created_at : verifiedUser.created_at
            }
        
             return res.status(200).send({token, minimalInfo}) // return the token and minimal info back to the user

        }
        
    }catch(e) {
        console.log(e)
    }
    
})