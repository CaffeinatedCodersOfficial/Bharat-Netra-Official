import express from "express";
import { macAddressLookup } from "../controllers/macAddress.lookup.controller.js";

const macAddressLookupRouter = express.Router();

macAddressLookupRouter.post("/macAdd-lookup", macAddressLookup);

export default macAddressLookupRouter;
