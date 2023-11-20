import { InferSchemaType, Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    content: String,
    isDone: Boolean,
  },
  { timestamps: true },
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema);
