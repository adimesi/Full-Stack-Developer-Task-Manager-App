import {useState,useEffect}  from "react";
import { Task } from "../types/task";
import { getTasks } from "../services/task";
import TasksDisplay from "./TasksDisplay";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


function dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    },[])   

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response);
            setError("");
        } catch (error: any) {
            setError(error?.response?.data?.message || "An unexpected error occurred");
        }
    }
    const onAddTask = async () => {
        navigate("/taskForm");
    }

    const handleTaskEdit = async (task: Task) => {
        const task_url = "/TaskCard/"+task.id;
        navigate(task_url);

    } 


    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Tasks</h1>
            {error && <p className="dashboard-error">{error}</p>}
            <button className="add-task-button" onClick={onAddTask}>Add Task</button>
            <div className="tasks-container">
            {tasks.length === 0 && <p className="no-tasks-message">No tasks found</p>}
            {tasks.length !== 0 && tasks.map((task) => (
                <div className="task-item" key={task.id}>
                <TasksDisplay
                    task={task}
                />
                <button className="edit-task-button" onClick={() => handleTaskEdit(task)}>Edit</button>
                </div>
            ))}
            </div>
        </div>
    
)}
export default dashboard;