import express from "express";
import { discoverSubdomains } from "../controllers/subdomain.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const subdomainRouter = express.Router();

subdomainRouter.post("/discover-subdomain", isAuth, discoverSubdomains);

export default subdomainRouter;
