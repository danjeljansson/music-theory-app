import db from "./config/database.config";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

db.sync().then(() => {
  console.log("Database connected");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
