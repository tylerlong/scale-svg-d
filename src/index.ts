import parse from 'parse-svg-path';

export const scale = (path: string, factor: number) => {
  const parsed = parse(path);
  let newPath = '';
  for (const [command, ...args] of parsed) {
    newPath += command;
    if (args.length > 0) {
      newPath += ' ' + args.map((item) => (item * factor).toFixed(2)).join(' ');
    }
  }
  return newPath;
};
