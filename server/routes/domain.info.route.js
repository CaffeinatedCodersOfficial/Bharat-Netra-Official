import express from "express";
import { getDomainInfo } from "../controllers/domain.info.controller.js";

const domainInfoRouter = express.Router();

domainInfoRouter.post("/domain-info", getDomainInfo);

export default domainInfoRouter;
