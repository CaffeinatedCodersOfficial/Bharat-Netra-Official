import express from "express";
import { scanPorts } from "../controllers/portScanner.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const portScannerRouter = express.Router();

portScannerRouter.post("/scan-ports", isAuth, scanPorts);

export default portScannerRouter;
