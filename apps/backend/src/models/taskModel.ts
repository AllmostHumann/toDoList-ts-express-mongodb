import { InferSchemaType, Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    content: String,
    done: Boolean,
  },
  { timestamps: true },
);

type Task = InferSchemaType<typeof taskSchema>;

export default model<Task>('Task', taskSchema);
