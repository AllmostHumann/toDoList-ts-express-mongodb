import express from 'express';
import * as TasksController from '../controllers/tasksControllers.js';

const router = express.Router();

router.get('/', TasksController.getTasks);

router.get('/exampleTasks/', TasksController.getExampleTasks);

router.get('/id/:taskId', TasksController.getTaskById);

router.get('/content/:content', TasksController.getTaskByContent);

router.get(
  '/exampleTasks/content/:content',
  TasksController.getExampleTaskByContent,
);

router.post('/', TasksController.createTask);

router.patch('/id/:taskId', TasksController.updateTaskStatus);

router.patch('/id/:taskId/content', TasksController.updateTaskContent);

router.patch('/', TasksController.updateAllTasksStatus);

router.delete('/id/:taskId', TasksController.deleteTask);

export default router;
