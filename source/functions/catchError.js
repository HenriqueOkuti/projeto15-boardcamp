export default function catchError(res, error) {
  console.log(error);
  return res.sendStatus(500);
}
// is this working????
