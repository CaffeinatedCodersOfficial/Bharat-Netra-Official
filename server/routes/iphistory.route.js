// routes/ipHistory.routes.js
import express from "express";
import { getIpHistory } from "../controllers/iphistory.controller.js";

const ipHistoryRouter = express.Router();

ipHistoryRouter.get("/ip-history", getIpHistory);

export default ipHistoryRouter;
