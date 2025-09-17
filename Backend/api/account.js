import express from "express";
const router = express.Router();
import { getForaByCreator } from "../Database/Queries/account.js";
export default router;
const secret = process.env.SECRET

// route to handle retreiving all fora associated with a specific user
router.route("/:id/fora").get(async (req, res, next)=> {
    const id = Number(req.params.id)
    const fora = await getForaByCreator(id)
    console.log(fora)
    res.status(200).send(fora)
})