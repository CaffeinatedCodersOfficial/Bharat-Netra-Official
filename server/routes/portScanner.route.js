import express from "express";
import { scanPorts } from "../controllers/portScanner.controller.js";

const portScannerRouter = express.Router();

portScannerRouter.post("/scan-ports", scanPorts);

export default portScannerRouter;
