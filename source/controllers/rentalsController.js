import { Router } from 'express';
import { validateRent } from '../middlewares/rentalsValidation.js';

const rentalsRouter = Router();
rentalsRouter.get('/rentals', () => {});
rentalsRouter.post('/rentals', validateRent);
rentalsRouter.post('/rentals/:id', () => {});
rentalsRouter.delete('/rentals:id', () => {});

export default rentalsRouter;
