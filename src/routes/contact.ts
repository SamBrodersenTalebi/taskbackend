import express from 'express';
import contactService from '../services/contactService';

const router = express.Router();

router.get('/averagePrice', (_req, res) => {
  const price: number = contactService.averagePrice(0.3);
  res.send({ averagePrice: price });
});

router.get('/topcars', (_req, res) => {
  res.send(contactService.mostContacted());
});

router.post('/', (_req, res) => {
  res.send('Saving a auto!');
});

export default router;
