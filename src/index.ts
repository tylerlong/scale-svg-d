const command = /([mlhvcsqtaz])([^mlhvcsqtaz]*)/gi;
const number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

// ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

export const scale = (d: string, scale: number): string => {
  const result: string[] = [];
  const commands = d.match(command);
  if (commands) {
    for (const command of commands) {
      result.push(command[0]);
      const numbers = command.match(number);
      if (numbers) {
        result.push(
          numbers
            .map((n, index) => {
              let factor = scale;
              if (command[0].toLowerCase() === 'a' && index >= 2 && index <= 4) {
                factor = 1;
              }
              let numStr = (Number(n) * factor).toFixed(2);
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
