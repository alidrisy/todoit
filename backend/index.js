import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import todoRouter from "./routes/todoRoute";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRouter);

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
