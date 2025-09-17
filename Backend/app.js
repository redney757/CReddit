import express from "express";
import cors from "cors"; // Add this line
const app = express();
export default app;
import loginRouter from '../Backend/api/login.js'
import registerRouter from '../Backend/api/register.js'
import foraRouter from './api/fora.js'
import accountRouter from './api/account.js'
import solutionsRouter from './api/solutions.js'
// Allow all CORS requests -- had issues getting backend and front end to take and send requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/fora", foraRouter)
app.use("/account", accountRouter)
app.use("/solutions", solutionsRouter)

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    case "23505":
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
