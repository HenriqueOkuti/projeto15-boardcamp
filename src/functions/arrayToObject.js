export default function arrayToObject(row) {
  const array = [...row];

  const labels = [
    'id',
    'customerId',
    'gameId',
    'rentDate',
    'daysRented',
    'returnDate',
    'originalPrice',
    'delayFee',
  ];
  const obj = {};
  labels.map((e, i) => (obj[labels[i]] = array[i]));
  obj['customer'] = {
    id: array[1],
    name: array[8],
  };
  obj['game'] = {
    id: array[2],
    name: array[9],
    categoryId: array[10],
    categoryName: array[11],
  };
  return obj;
}
