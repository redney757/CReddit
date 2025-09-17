import express from "express";
import { getSolutions } from "../Database/Queries/solutions.js";
const router = express.Router();
export default router;

router.route("/").get(async (req, res, next)=> {
    const response = await getSolutions()
    return res.status(200).send(response)
})