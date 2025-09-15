import express from "express";
import cors from "cors";

const app = express();
export default app;

import loginRouter from '../Backend/api/login.js';
import registerRouter from '../Backend/api/register.js';
import foraRouter from './api/fora.js';
import accountRouter from './api/account.js';
import solutionsRouter from './api/solutions.js';

/* 1) FIRST middleware */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const corsForSite = cors({
  origin: 'https://retekprojects.com',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
