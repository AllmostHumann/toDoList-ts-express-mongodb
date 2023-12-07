import { RequestHandler } from 'express';
import TaskModel from '../models/taskModels.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import exampleTasksModels from '../models/exampleTasksModels.js';

export const getTaskById: RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();

    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskByContent: RequestHandler = async (req, res, next) => {
  const taskContent = req.params.content;

  try {
    const task = taskContent
      ? await TaskModel.find({ content: new RegExp(taskContent, 'i') }).exec()
      : [];
    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    next(error);
  }
};

export const getExampleTaskByContent: RequestHandler = async (
  req,
  res,
  next,
) => {
  const exampleTaskContent = req.params.content;

  try {
    const exampleTask = exampleTaskContent
      ? await exampleTasksModels
          .find({
            content: new RegExp(exampleTaskContent, 'i'),
          })
          .exec()
      : [];
    res.status(200).json(exampleTask);
    console.log(exampleTask);
  } catch (error) {
    next(error);
  }
};

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().exec();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getExampleTasks: RequestHandler = async (req, res, next) => {
  try {
    const exampleTasks = await exampleTasksModels.find().exec();
    res.status(200).json(exampleTasks);
    console.log('Example tasks added');
  } catch (error) {
    next(error);
  }
};

interface CreateTaskBody {
  content?: string;
  done: boolean;
}

export const createTask: RequestHandler<
  unknown,
  unknown,
  CreateTaskBody,
  unknown
> = async (req, res, next) => {
  const content = req.body.content;
  const done = req.body.done;

  try {
    if (!content) {
      throw createHttpError(400, 'Task must have a content');
    }

    const newTask = await TaskModel.create({
      content: content,
      done: done,
    });

    res.status(201).json(newTask);
    console.log('New task added:', `${newTask}`);
  } catch (error) {
    next(error);
  }
};

interface UpdateTaskParams {
  taskId: string;
}

interface UpdateTaskBody {
  content: string;
  done: boolean;
}

export const updateTaskStatus: RequestHandler<
  UpdateTaskParams,
  unknown,
  UpdateTaskBody,
  unknown
> = async (req, res, next) => {
  const taskId = req.params.taskId;
  const newDone = req.body.done;

  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    task.done = newDone;

    const updateTaskStatus = await task.save();
    res.status(200).json(updateTaskStatus);
    console.log('task', `${taskId}`, 'status changed to', `${newDone}`);
  } catch (error) {
    next(error);
  }
};

export const updateTaskContent: RequestHandler<
  UpdateTaskParams,
  unknown,
  UpdateTaskBody,
  unknown
> = async (req, res, next) => {
  const taskId = req.params.taskId;
  const newContent = req.body.content;

  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    task.content = newContent;

    const updateTaskContent = await task.save();
    res.status(200).json(updateTaskContent);
    console.log('task', `${taskId}`, 'content changed to', ` ${newContent}`);
  } catch (error) {
    next(error);
  }
};

export const updateAllTasksStatus: RequestHandler<
  UpdateTaskParams,
  unknown,
  UpdateTaskBody,
  unknown
> = async (req, res, next) => {
  const newDone = req.body.done;

  try {
    const updateResult = await TaskModel.updateMany({}, { done: newDone });

    if (updateResult.matchedCount === 0) {
      throw createHttpError(404, 'No tasks found');
    }

    res.status(200).json({ message: 'All tasks updated successfully' });
    console.log('All tasks updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }
    const task = await TaskModel.findById(taskId).exec();

    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    await task.deleteOne();
    res.sendStatus(204);
    console.log('task', `${taskId}`, 'deleted');
  } catch (error) {
    next(error);
  }
};
