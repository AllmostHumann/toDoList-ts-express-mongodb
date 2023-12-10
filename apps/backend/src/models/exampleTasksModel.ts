import { InferSchemaType, Schema, model } from 'mongoose';

const exampleTaskSchema = new Schema(
  {
    _id: String,
    content: String,
    done: Boolean,
  },
  { timestamps: true },
);

type Task = InferSchemaType<typeof exampleTaskSchema>;

export default model<Task>('example_tasks', exampleTaskSchema);
