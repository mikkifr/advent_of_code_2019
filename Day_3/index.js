const fs = require('fs');
const path = require('path');
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

/************************************* */
const [a, b] = input.split('\n').map(i => i.split(','));

const sortPairs = (a, b) => (a[0] < b[0] || a[1] < b[1]) && -1 || 1;

const findCoordinates = (points) => {
  const coords = [[0, 0]];

  for(let i = 0; i < points.length; i++) {
    const dir = points[i][0];
    const distance = +points[i].slice(1,4);
    const coord = [...coords[coords.length - 1]];

    if(dir === "U") coord[1] += distance;
    if(dir === "D") coord[1] -= distance;
    if(dir === "L") coord[0] -= distance;
    if(dir === "R") coord[0] += distance;

    coords.push(coord);
  }

  return coords;
}

const coordsA = findCoordinates(a);
const coordsB = findCoordinates(b);

const distances = [];

for(let i = 0; i < coordsA.length - 1; i++) {
  for(n = 0; n < coordsB.length - 1; n++) {
    const p = [coordsA[i], coordsA[i + 1]];
    const q = [coordsB[n], coordsB[n + 1]];

    const [p1, p2] = p.sort(sortPairs);
    const [q1, q2] = q.sort(sortPairs);

    const intersectX =
      ((p1[0] === p2[0]) && (p1[0] > q1[0]) && (p1[0] < q2[0])) ||
      ((q1[0] === q2[0]) && (q1[0] > p1[0]) && (q1[0] < p2[0]));

    const intersectY =
      ((p1[1] === p2[1]) && (p1[1] > q1[1]) && (p1[1] < q2[1])) ||
      ((q1[1] === q2[1]) && (q1[1] > p1[1]) && (q1[1] < p2[1]));

    if(intersectX && intersectY) {
      const x = p1[0] === p2[0] ? p1[0] : q1[0];
      const y = p1[1] === p2[1] ? p1[1] : q1[1];
      distances.push(Math.abs(x) + Math.abs(y));
    }
  }
}

const part_1 = distances.sort((a, b) => a - b)[0];

console.log(part_1);