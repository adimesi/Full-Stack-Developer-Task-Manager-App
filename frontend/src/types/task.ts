export type Task = {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'done';
    due_date?: string;
    user_id: number;
}
export type CreateTaskRequest  = {
    title: string;
    description?: string;
    status: 'pending' | 'done';
    due_date?: string;
}

export type UpdateTaskRequest = {
    title?: string;
    description?: string;
    status?: 'pending' | 'done';
    due_date?: string;
}


