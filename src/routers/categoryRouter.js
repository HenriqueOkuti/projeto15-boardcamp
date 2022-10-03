import { Router } from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/categoriesController.js';
import { validadeCategory } from '../middlewares/categoriesValidation.js';

const categoryRouter = Router();
categoryRouter.get('/categories', getCategories);
categoryRouter.post('/categories', validadeCategory, createCategory);

export default categoryRouter;
