let cmdLen: { [cmd: string]: number } = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };

let segment = /([astvzqmhlc])([^astvzqmhlc]*)/gi;

function parse(path: string) {
  let data: string[][] = [];
  path.replace(segment, (_, _command: string, _args: string) => {
    let command = _command;
    let type = command.toLowerCase();
    const args = parseValues(_args);

    // overloaded moveTo
    if (type === 'm' && args.length > 2) {
      data.push([command].concat(args.splice(0, 2) as any));
      type = 'l';
      command = command === 'm' ? 'l' : 'L';
    }

    while (true) {
      if (args.length === cmdLen[type]) {
        args.unshift(command as any);
        data.push(args as any);
        return '';
      }
      if (args.length < cmdLen[type]) throw new Error('malformed path data');
      data.push([command].concat(args.splice(0, cmdLen[type]) as any));
    }
  });
  return data;
}

let number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

function parseValues(args: string) {
  let numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}

export default parse;
