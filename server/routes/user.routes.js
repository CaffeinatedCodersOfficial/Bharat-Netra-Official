import express from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { getUserData } from "../controllers/user.controller.js";
import { fetchTodaysData } from "../controllers/todaysData.controller.js";
import { fetchWeekData } from "../controllers/weekData.controlle.js";

const userRouter = express.Router();

userRouter.get("/user-data", isAuth, getUserData);
userRouter.get("/todays-data", isAuth, fetchTodaysData);
userRouter.get("/week-data", isAuth, fetchWeekData);

export default userRouter;
