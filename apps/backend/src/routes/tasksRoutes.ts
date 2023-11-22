import express from 'express';
import * as TasksController from '../controllers/tasksControllers.js';

const router = express.Router();

router.get('/', TasksController.getTasks);

router.get('/id/:taskId', TasksController.getTaskById);

router.get('/content/:content', TasksController.getTaskByContent);

router.post('/', TasksController.createTask);

export default router;
