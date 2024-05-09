import express from "express";
import router from "./routes/index";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);

export default app;
