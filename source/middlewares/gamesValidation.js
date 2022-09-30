import { gameSchema } from '../schemas/schemas.js';

export function validateGame(req, res, next) {
  const game = req.body;
  const validationStatus = gameSchema.validate(game);
  if (validationStatus.error) {
    return res.sendStatus(400);
  }
  next();
}
