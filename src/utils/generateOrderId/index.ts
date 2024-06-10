export default function generateOrderId(
  typeTx: string,
  length: number = 4
): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result1 = "";
  let result2 = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result1 += chars[randomIndex];
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result2 += chars[randomIndex];
  }

  return `${typeTx}-${result1}-${result2}`;
}
