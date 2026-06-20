import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "./context/TodoContext.jsx";

 const API = "http://localhost:5000/api/todo_task";
//  const API = import.meta.env.VITE_API_URL;
//const API = "https://todoapplicationupdated.onrender.com/api/todo_task";

 
function App() {
  const { tasks, setTasks } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueByDate, setDueByDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [search, setSearch] = useState("");

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  
  const addTask = async () => {
    try {
      if (!title.trim()) {
        setError("Title is required");
        return;
      }

      setError("");

      await axios.post(API, {
        title,
        description,
        dueByDate,
      });

      setTitle("");
      setDescription("");
      setDueByDate("");

      loadTasks();
    } catch (err) {
      setError("Failed to add task");
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  
  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.title);
  };

  
  const updateTask = async (id) => {
    try {
      await axios.put(`${API}/${id}`, {
        title: editText,
      });
      setEditId(null);
      setEditText("");
      loadTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  
  const toggleStatus = async (task) => {
    try {
      const newStatus =
        task.status === "completed" ? "pending" : "completed";

      await axios.patch(`${API}/${task._id}/status`, {
        status: newStatus,
      });

      loadTasks();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  
  const searchTasks = async () => {
    try {
      const res = await axios.get(`${API}?q=${search}`);
      setTasks(res.data);
    } catch (err) {
      setError("Search failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>To-Do App</h1>

     
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      {loading && <p>Loading...</p>}

      
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={dueByDate}
          onChange={(e) => setDueByDate(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addTask}>
          Add
        </button>
      </div>

      
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.searchBtn} onClick={searchTasks}>
          Search
        </button>
        <button style={styles.resetBtn} onClick={loadTasks}>
          Reset
        </button>
      </div>

      
      {tasks.length === 0 && !loading && <p>No tasks found</p>}

      <div>
        {tasks.map((task) => (
          <div key={task._id} style={styles.card}>
            <div>
              {editId === task._id ? (
                <input
                  style={styles.input}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <>
                  <h3
                    style={{
                      textDecoration:
                        task.status === "completed"
                          ? "line-through"
                          : "none",
                    }}
                  >
                    {task.title}
                  </h3>
                  <p>{task.description}</p>
                  <small>
                    📅{" "}
                    {task.dueByDate
                      ? new Date(task.dueByDate).toLocaleDateString()
                      : "No date"}
                  </small>
                </>
              )}
            </div>

            <div>
              {editId === task._id ? (
                <button
                  style={styles.saveBtn}
                  onClick={() => updateTask(task._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  style={styles.editBtn}
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>
              )}

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

              
              <button
                style={styles.Btn}
                 onClick={() => toggleStatus(task)}>
                {task.status === "completed" ? "Undo" : "Complete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    background: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  Btn: {
    background: "Blue",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    
  },
  searchBtn: {
    background: "#2196F3",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
  },
  resetBtn: {
    background: "#9E9E9E",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
  },
  card: {
    background: "white",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  editBtn: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
  },
  saveBtn: {
    background: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
  },
  deleteBtn: {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "5px",
  marginRight: "5px"   
},
};

export default App;