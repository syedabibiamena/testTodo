import {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
} from "../services/todoService.js";

// Get all tasks
export const getTasks = async (req, res) => {
  const search = req.query.q;

  let filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  try {
    const tasks = await getTodosService(filter);

    if (!tasks) {
      return res.status(400).json({
        error: "No tasks found",
      });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Get single task
export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await getTodoByIdService(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Create task
export const createTask = async (req, res) => {
  const { title, description, dueByDate } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill required fields",
      emptyFields,
    });
  }

  try {
    const task = await createTodoService({
      title,
      description,
      dueByDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await deleteTodoService(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Update task
export const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await updateTodoService(
      id,
      {
        ...req.body,
      }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Update status
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await getTodoByIdService(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    task.status = status;

    const updatedTask = await updateTodoService(id, task);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};