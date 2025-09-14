import express from "express";
import { getDomainInfo } from "../controllers/domain.info.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const domainInfoRouter = express.Router();

domainInfoRouter.post("/domain-info", isAuth, getDomainInfo);

export default domainInfoRouter;
