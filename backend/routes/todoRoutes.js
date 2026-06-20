import express from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/todoController.js";

const router = express.Router();

// Create Task
router.post("/", createTask);

// Get All Tasks
router.get("/", getTasks);

// Get Single Task
router.get("/:id", getTask);

// Update Task
router.put("/:id", updateTask);

// Delete Task
router.delete("/:id", deleteTask);

// Update Status
router.patch("/:id/status", updateStatus);

export default router;