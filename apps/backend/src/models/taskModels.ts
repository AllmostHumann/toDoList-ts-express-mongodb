import { InferSchemaType, Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    content: String,
    done: Boolean,
  },
  { timestamps: true },
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema);
