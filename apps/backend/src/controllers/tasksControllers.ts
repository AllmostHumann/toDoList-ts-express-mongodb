import { RequestHandler } from 'express';
import TaskModel from '../models/taskModels.js';

export const getTaskById: RequestHandler = async (req, res, next) => {
  const taskId = req.params.taskId;

  try {
    const task = await TaskModel.findById(taskId).exec();
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

export const createTask: RequestHandler = async (req, res, next) => {
  const content = req.body.content;
  const isDone = req.body.isDone;

  try {
    const newTask = await TaskModel.create({
      content: content,
      isDone: isDone,
    });

    res.status(201).json(newTask);
    console.log(newTask);
  } catch (error) {
    next(error);
  }
};
