import express from "express";
import { passwordBreaker } from "../controllers/password.breaker.controller.js";

const passwordBreakerRouter = express.Router();

passwordBreakerRouter.post("/pass-breaker", passwordBreaker);

export default passwordBreakerRouter;
