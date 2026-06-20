import Todo from "../models/todoModel.js";

// Create new task
export const createTodoService = async (taskData) => {
  return await Todo.create(taskData);
};

// Get all tasks
export const getTodosService = async (filter) => {
  return await Todo.find(filter).sort({
    createdAt: -1,
  });
};

// Get single task
export const getTodoByIdService = async (id) => {
  return await Todo.findById(id);
};

// Update task
export const updateTodoService = async (id, updatedData) => {
  return await Todo.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );
};

// Delete task
export const deleteTodoService = async (id) => {
  return await Todo.findByIdAndDelete(id);
};