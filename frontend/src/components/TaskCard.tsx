import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { Subtask } from '../types/subtask';
import { getSubtasks } from '../services/subtask';
import SubtaskForm from './SubtaskForm';
import { getTask, updateTask ,deleteTask} from '../services/task';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import './TaskCard.css';


function TaskCard() {
    const { id } = useParams();
    const [expanded, setExpanded] = useState(false);
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [task, setTask] = useState<Task>({
        id: 0,
        title: "",
        description: "",
        status: "pending",
        due_date: undefined,
        user_id: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchTask();
    }, []);
    
    useEffect(() => {
        if (expanded) {
            fetchSubTasks();
        }
    }, [expanded]);

    const fetchTask =async()=>{
        if (!id){
            navigate("/Dashboard");
            return;
        }
        try {
            const response = await getTask(id);
            setTask(response);
        }
        catch(error: any){
            navigate("/Dashboard");
        }
    }

    const fetchSubTasks = async () => {
        try {
            const response = await getSubtasks(task.id);
            setSubtasks(response||[]);
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formattedDueDate = task.due_date? `${new Date(task.due_date).toISOString().slice(0, 19).replace('T', ' ')}`: undefined;
            await updateTask(task.id, { ...task, due_date: formattedDueDate ?? undefined });
            setIsEditing(false);
            toast.success("Task updated successfully");
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            toast.success("Task deleted successfully");
            navigate("/Dashboard");
        } catch (error: any) {
            console.error(error);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        fetchTask();
    };
        
        
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString();
    };

    const formatDateForInput = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTask({
            ...task,
            due_date: value ? new Date(value).toISOString() : undefined,
        });
    };

    return (
        <div className="task-card">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="task-card__form">
                    <label htmlFor="title" className="task-card__label">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="task-card__input"
                    />
                    <label htmlFor="description" className="task-card__label">Description:</label>
                    <textarea
                        id="description"
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="task-card__textarea"
                    />
                    <label htmlFor="status" className="task-card__label">Status:</label>
                    <select
                        id="status"
                        value={task.status}
                        onChange={(e) => setTask({ ...task, status: e.target.value === "done" ? "done" : "pending" })}
                        className="task-card__select"
                    >
                        <option value="done">Done</option>
                        <option value="pending">Pending</option>
                    </select>
                    <label htmlFor="due_date" className="task-card__label">Due Date:</label>
                    <input
                        type="date"
                        id="due_date"
                        value={formatDateForInput(task.due_date)}
                        onChange={handleDateChange}
                        className="task-card__input"
                    />
                    <button type="button" onClick={handleEditCancel} className="task-card__button task-card__button--cancel">Cancel</button>
                    <button type="submit" className="task-card__button task-card__button--save">Save</button>
                </form>
            ) : (
                <>
                    <button onClick={() => navigate("/Dashboard")} className="task-card__button task-card__button--back">Back</button>
                    <h1 className="task-card__title">Task</h1>
                    
                    <h3 className="task-card__task-title">{task.title}</h3>
                    <p className="task-card__description">{task.description || ""}</p>
                    <span className={`task-card__status task-card__status--${task.status}`}>{task.status === 'done' ? 'Done' : 'Pending'}</span>
                    <p className="task-card__due-date">{formatDate(task.due_date)}</p>
                    <button onClick={() => setIsEditing(true)} className="task-card__button task-card__button--edit">Edit</button>
                    <button onClick={() => setShowDeleteConfirmation(true)} className="task-card__button task-card__button--delete">Delete</button>
                    <button onClick={() => setExpanded(!expanded)} className="task-card__button task-card__button--toggle">
                        {expanded ? 'Hide Subtasks' : 'Show Subtasks'}
                    </button>
                </>
            )}
            {expanded && (
                <ul className="task-card__subtasks">
                    {subtasks.map((subtask: Subtask) => (
                        <li key={subtask.id} className="task-card__subtask">
                            {subtask.title}
                            <span className={`task-card__subtask-status task-card__subtask-status--${subtask.status}`}>
                                {subtask.status === 'done' ? 'Done' : 'Pending'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            {showSubtaskForm && (
                <SubtaskForm taskId={task.id} onSubtaskCreate={() => { fetchSubTasks(); setShowSubtaskForm(false); }} onCancel={() => setShowSubtaskForm(false)} />
            )}
            <button onClick={() => setShowSubtaskForm(true)} className="task-card__button task-card__button--add-subtask">Add Subtask</button>
            {showDeleteConfirmation && (
                <div className="task-card__delete-confirmation">
                    <p className="task-card__delete-message">Are you sure you want to delete this task?</p>
                    <button onClick={handleDelete} className="task-card__button task-card__button--confirm-delete">Yes</button>
                    <button onClick={() => setShowDeleteConfirmation(false)} className="task-card__button task-card__button--cancel-delete">No</button>
                </div>
            )}
        </div>
    );
}

export default TaskCard;