import express from "express";
import { validateEmail } from "../controllers/email.validator.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const emailValidatorRouter = express.Router();

emailValidatorRouter.post("/validate-email", isAuth, validateEmail);

export default emailValidatorRouter;
