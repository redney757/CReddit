import express from "express";
import { getSolutions } from "../Database/Queries/solutions.js";
const router = express.Router();
export default router;
//route that handles the request and response for the solutions page. This is a get request so nothing was sent in the body.
router.route("/").get(async (req, res, next)=> {
    const response = await getSolutions()
    return res.status(200).send(response) // sends a 200 OK status with the solutions in the response
})