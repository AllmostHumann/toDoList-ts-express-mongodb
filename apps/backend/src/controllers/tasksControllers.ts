import { RequestHandler } from 'express';
import TaskModel from '../models/taskModels.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

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
    console.log(newTask);
  } catch (error) {
    next(error);
  }
};

interface UpdateTaskParams {
  taskId: string;
}

interface UdpateTaskBody {
  content?: string;
  done: boolean;
}

export const updateTask: RequestHandler<
  UpdateTaskParams,
  unknown,
  UdpateTaskBody,
  unknown
> = async (req, res, next) => {
  const taskId = req.params.taskId;
  const newContent = req.body.content;
  const newDone = req.body.done;

  try {
    if (!mongoose.isValidObjectId(taskId)) {
      throw createHttpError(400, 'Invalid task id');
    }
    if (!newContent) {
      throw createHttpError(400, 'Task must have a content');
    }

    const task = await TaskModel.findById(taskId).exec();
    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    task.content = newContent;
    task.done = newDone;

    const udpatedTask = await task.save();
    res.status(200).json(udpatedTask);
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
  } catch (error) {
    next(error);
  }
};
