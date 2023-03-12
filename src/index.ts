import parse from './parser';

export const scale = (path: string, factor: number) => {
  const parsed: string[][] = parse(path);
  let newPath = '';
  for (const items of parsed) {
    newPath += items[0];
    for (const item of items.slice(1)) {
      newPath += ` ${(parseFloat(item) * factor).toFixed(2)}`;
    }
  }
  return newPath;
};
