import { Router } from 'express';
import {
  createCustomer,
  getCustomers,
  getSpecificCustomer,
  updateCustomer,
} from '../controllers/customersControllers.js';
import { validateCustomer } from '../middlewares/customersValidation.js';

const customersRouter = Router();
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getSpecificCustomer);
customersRouter.post('/customers', validateCustomer, createCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);

export default customersRouter;
