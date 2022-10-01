export default function getDeltaDays(dueDate) {
  const DAYS_CONVERSION = 1 / (24 * 3600 * 1000);
  const deltaTime = new Date().getTime() - new Date(dueDate).getTime();
  return Math.round(deltaTime * DAYS_CONVERSION);
}
