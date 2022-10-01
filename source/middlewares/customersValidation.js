import { customerSchema } from '../schemas/schemas.js';

export function validateCustomer(req, res, next) {
  const customer = req.body;
  const validationStatus = customerSchema.validate(customer);
  if (validationStatus.error) {
    return res.sendStatus(400);
  }
  next();
}
