export interface TaskResult {
  _id: string;
  content: string;
  done?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type TasksResponse = TaskResult[];
