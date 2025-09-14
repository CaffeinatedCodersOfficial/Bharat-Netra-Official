import express from "express";
import { lookupIP } from "../controllers/reverseip.lookup.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const reverseIpRouter = express.Router();

// GET /api/lookup/:ip
reverseIpRouter.post("/lookup", isAuth, lookupIP);

export default reverseIpRouter;
