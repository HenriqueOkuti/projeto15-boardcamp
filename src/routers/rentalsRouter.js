import { Router } from 'express';
import { validateRent } from '../middlewares/rentalsValidation.js';
import {
  returnRent,
  endRent,
  getRentals,
  startRent,
} from '../controllers/rentalsController.js';

const rentalsRouter = Router();
rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateRent, startRent);
rentalsRouter.post('/rentals/:id/return', endRent);
rentalsRouter.delete('/rentals/:id', returnRent);

export default rentalsRouter;
