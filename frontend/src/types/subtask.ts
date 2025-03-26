export type Subtask = {
    id: number;
    title: string;
    status: 'pending' | 'done';
    due_date?: string;
    task_id: number;
}
export type CreateSubtaskRequest = {
    title: string;
    status: 'pending' | 'done';
    due_date?: string;
}
