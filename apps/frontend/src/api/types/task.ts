export interface Task {
  _id: string;
  content: string;
  done?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type Tasks = Task[];
