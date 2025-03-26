import React,{useState} from "react";
import { Subtask } from "../types/subtask";
import { createSubtask } from "../services/subtask";
import { toast } from "react-toastify";
import "../components/SubtaskForm.css";


type SubtaskFormProps = {
    taskId: number;
    onSubtaskCreate: (subtask: Subtask) => void;
    onCancel: () => void;
}

const SubtaskForm: React.FC<SubtaskFormProps> = ({taskId, onSubtaskCreate, onCancel}) => {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const[status,setStatus]=useState("pending");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            toast.error("Title is required");
            return;
        }
        try {
            setLoading(true);
            const formattedDueDate = dueDate? `${new Date(dueDate).toISOString().slice(0, 19).replace('T', ' ')}`: null;
            const subtask = await createSubtask(taskId, {
                title: title.trim(),
                status: status==="Done" ? "done" : "pending",
                due_date: formattedDueDate ?? undefined,
            });
            onSubtaskCreate(subtask);
            setTitle("");
            setDueDate("");
            setStatus("pending");
            toast.success("Subtask created successfully! 🎉");
        } catch (error: any) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return(
        <form className="subtask-form" onSubmit={handleSubmit}>
            <label className="subtask-form__label">
            Title
            <input 
                className="subtask-form__input" 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            </label>
            <label className="subtask-form__label">
            Due Date
            <input 
                className="subtask-form__input" 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
            />
            </label>
            <label className="subtask-form__label">
            Status
            <select className="subtask-form__input" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Done</option>
            </select>
            </label>
            <div className="subtask-form__buttons">
            <button 
                className="subtask-form__button subtask-form__button--cancel" 
                onClick={onCancel}
            >
                Cancel
            </button>
            <button 
                className="subtask-form__button subtask-form__button--submit" 
                type="submit" 
                disabled={loading || !title.trim()}
            >
                Create
            </button>
            </div>
            <div className="subtask-form__status">
            {loading ? 'Adding subtask...' : 'Add subtask'}
            </div>
        </form>
    );
};

export default SubtaskForm;
