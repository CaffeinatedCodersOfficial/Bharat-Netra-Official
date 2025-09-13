import express from "express";
import { lookupIP } from "../controllers/reverseip.lookup.controller.js";

const reverseIpRouter = express.Router();

// GET /api/lookup/:ip
reverseIpRouter.post("/lookup", lookupIP);

export default reverseIpRouter;
