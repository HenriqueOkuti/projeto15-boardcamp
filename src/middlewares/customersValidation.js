import { customerSchema } from '../schemas/schemas.js';
import { STATUS_CODE } from '../enums/statusCodes.js';

export function validateCustomer(req, res, next) {
  const customer = req.body;
  const validationStatus = customerSchema.validate(customer);
  if (validationStatus.error) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
  next();
}
