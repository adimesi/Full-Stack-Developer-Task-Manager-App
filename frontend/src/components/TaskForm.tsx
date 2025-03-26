import React, { useState } from "react";
import { createTask } from "../services/task";
import { CreateTaskRequest} from "../types/task";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./TaskForm.css";

function TaskForm() {
    const [newTask, setNewTask] = useState<CreateTaskRequest>({
        title: "",
        description: "",
        status: "pending",
        due_date: undefined,
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await createTask(newTask);
            setNewTask({
                title: "",
                description: "",
                status: "pending",
                due_date: undefined,
            });
            toast.success("Task created successfully! 🎉");
            navigate("/dashboard");

        } catch (error: any) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewTask({
            ...newTask,
            due_date: value ? new Date(value).toISOString().split("T")[0] : "",
        });
    };
    
    const onCancel = () => {
        navigate("/dashboard");
    };
        
    return (
        <div className="task-form-container">
            <h2 className="task-form-title">Create Task</h2>
            <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Title</label>
                <input className="form-input" type="text" id="title" name="title" value={newTask.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description (optional)</label>    
                <textarea className="form-textarea" id="description" name="description" value={newTask.description || ' '} onChange={handleChange} rows={1} />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" id="status" name="status" value={newTask.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
                </select>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="due_date">Due Date (optional)</label>
                <input className="form-input" type="date" id="due_date" name="due_date" onChange={handleDateChange} />
            </div>
            <div className="form-actions">
                <button className="form-button cancel-button" type="button" onClick={onCancel}>Cancel</button>
                <button className="form-button submit-button" type="submit" disabled={isLoading}>
                {isLoading ? <span>Loading...</span> : "Create Task"}
                </button>
            </div>
            </form>
        </div>
    );
}

export default TaskForm;