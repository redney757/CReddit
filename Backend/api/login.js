import express from "express";
import { getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
export default router;
const secret = process.env.SECRET


router.route("/").post(async (req, res, next) => {
    try {
        if (!req.body.usernameOrEmail && !req.body.password){
             return res.status(400).send(400)

        } else {
            const destructuredUserInfo = { usernameOrEmail : req.body.usernameOrEmail, password : req.body.password}
            const verifiedUser = await getUserByUsernameOrEmail(destructuredUserInfo) 
            const token = jwt.sign({id:verifiedUser.id}, secret) 
        
        return res.status(200).send({token, verifiedUser})

        }
        
    }catch(e) {
        console.log(e)
    }
    
})