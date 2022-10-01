import { rentalSchema } from '../schemas/schemas';

export function validateRent(req, res, next) {
  const rent = req.body;
  const validationStatus = rentalSchema.validate(rent);
  if (validationStatus.error) {
    return res.sendStatus(400);
  }

  next();
}
