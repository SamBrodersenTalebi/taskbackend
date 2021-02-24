import express from 'express';
import listingRouter from './routes/listing';
import contactRouter from './routes/contact';
const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api/listing', listingRouter);
app.use('/api/contact', contactRouter);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
