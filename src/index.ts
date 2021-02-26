/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import cors from 'cors';
import listingRouter from './routes/listing';
import contactRouter from './routes/contact';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());

app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
