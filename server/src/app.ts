import express, { Request, Response } from "express";
import router from "./routes/index";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/", router);

app.use((error: Error, req: Request, res: Response) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

export default app;
