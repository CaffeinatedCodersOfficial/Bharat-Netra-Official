import express from "express";
import { macAddressLookup } from "../controllers/macAddress.lookup.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const macAddressLookupRouter = express.Router();

macAddressLookupRouter.post("/macAdd-lookup", isAuth, macAddressLookup);

export default macAddressLookupRouter;
