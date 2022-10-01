export default function handleParams(customerId, gameId) {
  const params = [];
  const conditions = [];
  let searchBy = '';
  if (customerId) {
    params.push(customerId);
    conditions.push(`rentals."customerId" = $${params.length}`); // params.length = 1
  }
  if (gameId) {
    params.push(gameId);
    conditions.push(`rentals."gameId"=$${params.length}`); // params.length = 1 || 2
  }
  if (params.length > 0) {
    searchBy += `WHERE ${conditions.join(' AND ')}`;
  }
  return [searchBy, params];
}
