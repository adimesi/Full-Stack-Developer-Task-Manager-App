import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import { Subtask } from '../types/subtask';
import { getSubtasks} from '../services/subtask';
import SubtaskForm from './SubtaskForm';
import './TasksDisplay.css';


type TasksDisplayProp = {
    task: Task;

}

const TasksDisplay: React.FC<TasksDisplayProp> = ({ task}) => {
    const [expanded, setExpanded] = useState(false);
    const [subtasks, setSubtasks] = useState<Subtask[]>([]);
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);

    useEffect(() => {
        if (expanded) {
            fetchSubTasks();
        }
    }, [expanded]);

    const fetchSubTasks = async () => {
        try {
            const response = await getSubtasks(task.id);
            setSubtasks(response||[]);
        } catch (error: any) {
            console.error(error);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No due date';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="task-display">
            <>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-field">
            <strong>Description:</strong> {task.description || " "}
            </p>
            <p className="task-field">
            <strong>Status:</strong> {task.status === 'done' ? 'Done' : 'Pending'}
            </p>
            <p className="task-field">
            <strong>Due Date:</strong> {formatDate(task.due_date)}
            </p>
            <button className="toggle-subtasks-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide Subtasks' : 'Show Subtasks'}
            </button>
            </>
        
            {expanded && (
            <ul className="subtasks-list">
                {subtasks.map((subtask: Subtask) => (
                <li key={subtask.id} className="subtask-item">
                    <p className="subtask-title">
                    <strong>Title:</strong> {subtask.title}
                    </p>
                    <p className="subtask-field">
                    <strong>Status:</strong> {subtask.status === 'done' ? 'Done' : 'Pending'}
                    </p>
                    <p className="subtask-field">
                    {subtask.due_date ? (
                        <span>
                        <strong>Due Date:</strong>
                        {new Date(subtask.due_date).toLocaleDateString()}
                        </span>
                    ) : <span>
                    <strong>Due Date:</strong>
                    {'No due date'}
                    </span>}
                    </p>
                </li>
                ))}
            </ul>
            )}
            {showSubtaskForm && (
            <SubtaskForm 
                taskId={task.id} 
                onSubtaskCreate={() => { fetchSubTasks(); setShowSubtaskForm(false); }} 
                onCancel={() => setShowSubtaskForm(false)} 
            />
            )}
        </div>
    );
}

export default TasksDisplay;