import api from "./api";
import { Subtask, CreateSubtaskRequest } from "../types/subtask";

export const createSubtask = async (taskId:number,subtask: CreateSubtaskRequest): Promise<Subtask> => {
    const response = await api.post<Subtask>(`/tasks/${taskId}/subtasks`, subtask);
      return response.data;
}
export const getSubtasks = async (taskId:number): Promise<Subtask[]> => {
    const response = await api.get<Subtask[]>(`/tasks/${taskId}/subtasks`);
      return response.data;
};

