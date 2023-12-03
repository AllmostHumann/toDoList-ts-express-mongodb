export const apiBaseUrl = 'http://localhost:5000/api';

const commonEndpoints = {
  tasks: '/tasks/',
  taskId: '/tasks/id/',
  getTaskContent: '/tasks/content/',
  exampleTasksContent: '/tasks/exampleTasks/',
  getExampleTasksByContent: '/tasks/exampleTasks/content/',
};

export const apiConfig = {
  getTasks: {
    endpoint: `${commonEndpoints.tasks}`,
  },
  getTaskById: {
    endpoint: `${commonEndpoints.taskId}`,
  },
  getTaskByContent: {
    endpoint: `${commonEndpoints.getTaskContent}`,
  },
  getExampleTasks: {
    endpoint: `${commonEndpoints.exampleTasksContent}`,
  },
  getExampleTaskByContent: {
    endpoint: `${commonEndpoints.getExampleTasksByContent}`,
  },
  postTask: {
    endpoint: `${commonEndpoints.tasks}`,
  },
  updateTask: {
    endpoint: `${commonEndpoints.taskId}`,
  },
};
