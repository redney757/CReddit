import express from "express";
import cors from "cors";

const app = express();
export default app;

import loginRouter from '../Backend/api/login.js';
import registerRouter from '../Backend/api/register.js';
import foraRouter from './api/fora.js';
import accountRouter from './api/account.js';
import solutionsRouter from './api/solutions.js';

/* 1) HARD CORS safety net – FIRST middleware */
app.use((req, res, next) => {
  // Start wide open to prove it works; tighten to your origin after it’s working
  res.setHeader('Access-Control-Allow-Origin', '*'); // later: 'https://retekprojects.com'
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  // res.setHeader('Access-Control-Allow-Credentials', 'true'); // only if you switch to cookies
  if (req.method === 'OPTIONS') return res.sendStatus(204); // preflight OK
  next();
});

/* 2) Optional: regular cors() (harmless to keep) */
const corsForSite = cors({
  origin: 'https://retekprojects.com',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 3) PER-ROUTER CORS – applies to preflight + actual for each base path */
app.use('/login',     corsForSite, loginRouter);
app.use('/register',  corsForSite, registerRouter);
app.use('/fora',      corsForSite, foraRouter);
app.use('/account',   corsForSite, accountRouter);
app.use('/solutions', corsForSite, solutionsRouter);

/* 4) Error handlers */
app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02": return res.status(400).send(err.message);
    case "23505":
    case "23503": return res.status(400).send(err.detail);
    default: next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
