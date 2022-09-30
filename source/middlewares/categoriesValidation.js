import { categoriesSchema } from '../schemas/schemas.js';

export function validadeCategory(req, res, next) {
  console.log('entered validation middleware');
  const category = req.body;
  const validationStatus = categoriesSchema.validate(category);
  if (validationStatus.error) {
    return res.sendStatus(400);
  }

  next();
}
