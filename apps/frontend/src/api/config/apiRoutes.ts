export const apiBaseUrl = 'http://localhost:5000/api';

const commonEndpoints = {
  tasks: '/tasks/',
  taskId: '/tasks/id/',
  getTaskContent: '/tasks/content/',
  exampleTasksContent: '/tasks/exampleTasks/',
  getExampleTasksByContent: '/tasks/exampleTasks/content/',
  getAuthenticadedUser: '/users/',
  userSignup: '/users/signup/',
  userLogin: '/users/login/',
  userLogout: '/users/logout',
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
  updateTaskStatus: {
    endpoint: `${commonEndpoints.taskId}`,
  },
  updateTaskContent: {
    endpoint: `${commonEndpoints.taskId}`,
  },
  getAuthenticadedUser: {
    endopoint: `${commonEndpoints.getAuthenticadedUser}`,
  },
  userSignup: {
    endpoint: `${commonEndpoints.userSignup}`,
  },
  userLogin: {
    endpoint: `${commonEndpoints.userLogin}`,
  },
  userLogout: {
    endpoint: `${commonEndpoints.userLogout}`,
  },
};
