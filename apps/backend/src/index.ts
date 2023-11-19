import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
// const port = process.env.PORT;
const port = 3001;

app.listen(port, () =>
  console.log('SERVER STARTED' + port),
);

// mongoose
//   .connect(process.env.MONGO_CONNECTION_STRING)
//   .then(() => {
//     console.log('Mongoose connected');
//     app.listen(port, () => {
//       console.log('SERVER STARTED' + port);
//     });
//   });
