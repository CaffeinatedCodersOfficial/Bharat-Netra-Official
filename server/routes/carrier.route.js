import express from "express";
import { carrierLookup } from "../controllers/carrier.controller.js";

const carrierRouter = express.Router();

carrierRouter.post("/check-carrier", carrierLookup);

export default carrierRouter;
