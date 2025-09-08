import express from "express";
import { discoverSubdomains } from "../controllers/subdomain.controller.js";

const subdomainRouter = express.Router();

subdomainRouter.post("/discover-subdomain", discoverSubdomains);

export default subdomainRouter;
