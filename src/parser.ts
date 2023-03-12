import fs from 'fs';

const command = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
const number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
export const scale = (path: string, scale: number): string => {
  const result: string[] = [];
  const commands = path.match(command);
  if (commands) {
    for (const command of commands) {
      console.log(command);
      result.push(command[0]);
      const numbers = command.match(number);
      if (numbers) {
        result.push(
          numbers
            .map((n) => {
              let numStr = (Number(n) * scale).toFixed(2);
              if (numStr.indexOf('.') !== -1) {
                numStr = numStr.replace(/0+$/, '');
                numStr = numStr.replace(/\.$/, '');
              }
              return numStr;
            })
            .join(','),
        );
      }
    }
  }
  return result.join('');
};

const path =
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.75 5.5H9c.55 0 1 .45 1 1v4.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7h-.75C7.34 7 7 6.66 7 6.25s.34-.75.75-.75zm4.75 12.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V14h-1v2.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V14h-1v3.75c0 .41-.34.75-.75.75S6 18.16 6 17.75V13.5c0-.55.45-1 1-1h4.5c.55 0 1 .45 1 1v4.25zm-.5-7c0-.41.34-.75.75-.75H15V9h-2c-.55 0-1-.45-1-1V6.5c0-.55.45-1 1-1h2.75c.41 0 .75.34.75.75s-.34.75-.75.75H13.5v1h2c.55 0 1 .45 1 1v1.5c0 .55-.45 1-1 1h-2.75c-.41 0-.75-.34-.75-.75zM18 16c0 .55-.45 1-1 1h-2v.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75V13.5c0-.55.45-1 1-1H17c.55 0 1 .45 1 1V16z M15 14h1.5v1.5H15z';

const factor = 40;
const result = scale(path, factor);
console.log(result);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${24 * factor}" height="${24 * factor}" viewBox="0 0 ${
  24 * factor
} ${24 * factor}"><path d="${result}"/></svg>`;
fs.writeFileSync('temp.svg', svg);

// let cmdLen: { [cmd: string]: number } = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };

// let segment = /([astvzqmhlc])([^astvzqmhlc]*)/gi;

// function parse(path: string) {
//   let data: string[][] = [];
//   path.replace(segment, (_, _command: string, _args: string) => {
//     let command = _command;
//     let type = command.toLowerCase();
//     const args = parseValues(_args);

//     // overloaded moveTo
//     if (type === 'm' && args.length > 2) {
//       data.push([command].concat(args.splice(0, 2) as any));
//       type = 'l';
//       command = command === 'm' ? 'l' : 'L';
//     }

//     while (true) {
//       if (args.length === cmdLen[type]) {
//         args.unshift(command as any);
//         data.push(args as any);
//         return '';
//       }
//       if (args.length < cmdLen[type]) throw new Error('malformed path data');
//       data.push([command].concat(args.splice(0, cmdLen[type]) as any));
//     }
//   });
//   return data;
// }

// let number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

// function parseValues(args: string) {
//   let numbers = args.match(number);
//   return numbers ? numbers.map(Number) : [];
// }

// export default parse;
