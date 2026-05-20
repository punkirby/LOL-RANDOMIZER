export const pickOne = <T>(items: readonly T[]): T => {
  if (!items.length) {
    throw new Error("Cannot pick from an empty collection");
  }

  return items[Math.floor(Math.random() * items.length)];
};

export const pickMany = <T>(items: readonly T[], amount: number): T[] => {
  const pool = [...items];
  const picked: T[] = [];

  while (pool.length && picked.length < amount) {
    const index = Math.floor(Math.random() * pool.length);
    const [item] = pool.splice(index, 1);
    picked.push(item);
  }

  return picked;
};

export const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
