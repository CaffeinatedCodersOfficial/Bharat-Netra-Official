// routes/ipHistory.routes.js
import express from "express";
import {
  getIPHistory,
  reverseIPLookup,
} from "../controllers/iphistory.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const ipHistoryRouter = express.Router();

ipHistoryRouter.post("/ip-history", isAuth, getIPHistory);
ipHistoryRouter.post("/reverse-ip-history", isAuth, reverseIPLookup);

export default ipHistoryRouter;
