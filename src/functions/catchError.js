import { STATUS_CODE } from '../enums/statusCodes.js';
export default function catchError(res, error) {
  console.log(error);
  return res.sendStatus(STATUS_CODE.SERVER_ERROR);
}
