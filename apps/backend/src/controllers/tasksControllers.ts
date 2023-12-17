import { RequestHandler } from 'express';
import TaskModel from '../models/taskModel.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { assertIsDefined } from '../util/assertIsDefined.js';

export const getTasks: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const tasks = await TaskModel.find({ userId: authenticatedUserId }).exec();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById: RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();

    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    if (!task.userId?.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this task');
    }

    res.status(200).json(task);
    console.log(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskByContent: RequestHandler = async (req, res, next) => {
  const taskContent = req.params.content;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const task = taskContent
      ? await TaskModel.find({
          userId: authenticatedUserId,
          content: new RegExp(taskContent, 'i'),
        }).exec()
      : [];

    res.status(200).json(task);
    console.log(task);
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!content) {
      throw createHttpError(400, 'Task must have a content');
    }

    const newTask = await TaskModel.create({
      userId: authenticatedUserId,
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    if (!task.userId?.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this task');
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }

    const task = await TaskModel.findById(taskId).exec();
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    if (!task.userId?.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this task');
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const tasks = await TaskModel.updateMany(
      { userId: authenticatedUserId },
      { done: newDone },
    ).exec();

    if (tasks.matchedCount === 0) {
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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }
    const task = await TaskModel.findById(taskId).exec();

    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    if (!task.userId?.equals(authenticatedUserId)) {
      throw createHttpError(401, 'You cannot access this task');
    }

    await task.deleteOne();
    res.sendStatus(204);
    console.log('task', `${taskId}`, 'deleted');
  } catch (error) {
    next(error);
  }
};
