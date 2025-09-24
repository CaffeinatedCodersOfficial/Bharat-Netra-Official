import express from "express";
import { passwordBreaker } from "../controllers/password.breaker.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const passwordBreakerRouter = express.Router();

passwordBreakerRouter.post("/pass-breaker", isAuth, passwordBreaker);

export default passwordBreakerRouter;
