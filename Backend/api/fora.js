import express from "express";
import { getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
import { getFora } from "../Database/Queries/fora.js";
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