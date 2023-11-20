import express from 'express';
import * as TasksController from '../controllers/tasksControllers.js';

const router = express.Router();

router.get('/', TasksController.getTasks);

router.get('/:taskId', TasksController.getTask);

router.post('/', TasksController.createTask);

export default router;
