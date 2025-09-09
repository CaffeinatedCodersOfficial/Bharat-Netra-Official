import express from "express";
import { validateEmail } from "../controllers/email.validator.controller.js";

const emailValidatorRouter = express.Router();

emailValidatorRouter.post("/validate-email", validateEmail);

export default emailValidatorRouter;
