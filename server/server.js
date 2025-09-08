import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/mongodb.config.js";
import domainInfoRouter from "./routes/domain.info.route.js";

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/domain/", domainInfoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
