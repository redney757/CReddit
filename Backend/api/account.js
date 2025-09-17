import express from "express";
import { getUserById, getUserByUsernameOrEmail} from "../Database/Queries/login.js"; 
const router = express.Router();
import jwt from 'jsonwebtoken'
import { createForum, getFora, getForum, createMainMessage, getForumMessages, createRelyMessage } from "../Database/Queries/fora.js";
import { getForaByCreator } from "../Database/Queries/account.js";
export default router;
const secret = process.env.SECRET


router.route("/:id/fora").get(async (req, res, next)=> {
    const id = Number(req.params.id)
    const fora = await getForaByCreator(id)
    console.log(fora)
    res.status(200).send(fora)
})