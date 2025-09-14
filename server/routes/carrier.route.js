import express from "express";
import { carrierLookup } from "../controllers/carrier.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const carrierRouter = express.Router();

carrierRouter.post("/check-carrier", isAuth, carrierLookup);

export default carrierRouter;
