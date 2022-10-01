import { gameSchema } from '../schemas/schemas.js';
import { STATUS_CODE } from '../enums/statusCodes.js';

export function validateGame(req, res, next) {
  const game = req.body;
  const validationStatus = gameSchema.validate(game);
  if (validationStatus.error) {
    return res.sendStatus(STATUS_CODE.BAD_REQUEST);
  }
  next();
}
