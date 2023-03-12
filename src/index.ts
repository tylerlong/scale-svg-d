const command = /([mlhvcsqtaz])([^mlhvcsqtaz]*)/gi;
const number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

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
