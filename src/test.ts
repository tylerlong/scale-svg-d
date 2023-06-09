import fs from 'fs';

import { scale } from './index';

const d =
  'M22 4h-5.17L15 2H9L7.17 4H2v16h20V4zM12 7c1.63 0 3.06.79 3.98 2H12c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1H7.1A5.002 5.002 0 0 1 12 7zm0 10c-1.63 0-3.06-.79-3.98-2H12c1.66 0 3-1.34 3-3 0-.35-.07-.69-.18-1h2.08a5.002 5.002 0 0 1-4.9 6z';
console.log(d);
const result = scale(d, 10);
console.log(result);

const origin = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><path d="${d}"/></svg>`;
fs.writeFileSync('origin.svg', origin);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480"><path d="${result}"/></svg>`;
fs.writeFileSync('temp.svg', svg);
