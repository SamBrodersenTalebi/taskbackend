import express from 'express';
import listingService from '../services/listingService';
const router = express.Router();

router.get('/averageprice', (_req, res) => {
  res.send(listingService.averageSelling());
});

router.get('/distribution', (_req, res) => {
  res.send(listingService.getDistribution());
});

router.post('/', (_req, res) => {
  res.send('Saving a auto!');
});

export default router;
