import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connecttoDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connecttoDB();

const app = express();

// app.use(cors());

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/todo_task", todoRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;


  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running up and running on port ${PORT}`);
});