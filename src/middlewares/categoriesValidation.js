import { categoriesSchema } from '../schemas/schemas.js';
import { STATUS_CODE } from '../enums/statusCodes.js';

export function validadeCategory(req, res, next) {
  const category = req.body;
  const validationStatus = categoriesSchema.validate(category);
  if (validationStatus.error) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
  next();
}
