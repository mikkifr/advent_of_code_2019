const fs = require('fs');
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

/************************************* */

const [pathsA, pathsB] = input.split('\n').map(i => i.split(','))

const sortPairs = (a, b) => (a[0] < b[0] || a[1] < b[1]) && -1 || 1;

const within = (val, min, max) => val > min && val < max;

const getPositions = (path) => {
  const positions = [[[0, 0], 0]];

  for(let i = 0, steps = 0; i < path.length; i++) {
    const dir = path[i][0];
    const distance = +path[i].slice(1,4);
    const newPosition = [...positions[positions.length - 1][0]];

    if(dir === "U") newPosition[1] += distance;
    if(dir === "D") newPosition[1] -= distance;
    if(dir === "L") newPosition[0] -= distance;
    if(dir === "R") newPosition[0] += distance;

    steps += distance;
    positions.push([newPosition, steps]);
  }

  return positions;
}

const intersects = (startA, endA, startB, endB) => {
  const [a1, a2] = [startA, endA].concat().sort(sortPairs);
  const [b1, b2] = [startB, endB].concat().sort(sortPairs);

  const intersectX = within(a1[0], b1[0], b2[0]) || within(b1[0], a1[0], a2[0]);
  const intersectY = within(a1[1], b1[1], b2[1]) || within(b1[1], a1[1], a2[1]);

  return intersectX && intersectY;
}

const getIntersections = (pathA, pathB) => {
  const positionsA = getPositions(pathsA);
  const positionsB = getPositions(pathsB);

  const results = [];

  for(let i = 0; i < positionsA.length - 1; i++) {
    const startPosA = positionsA[i][0];
    const endPosA = positionsA[i + 1][0];

    for(n = 0; n < positionsB.length - 1; n++) {
      const startPosB = positionsB[n][0];
      const endPosB = positionsB[n + 1][0];

      if(intersects(startPosA, endPosA, startPosB, endPosB)) {
        const a_isVertical = startPosA[0] === endPosA[0];
        const a_isHorizontal = startPosA[1] === endPosA[1];

        const intersectPosX = a_isVertical ? startPosA[0] : startPosB[0];
        const intersectPosY = a_isHorizontal ? startPosA[1] : startPosB[1];

        const distance = Math.abs(intersectPosX) + Math.abs(intersectPosY);

        const horizontalPathPosX = a_isVertical ? startPosB[0] : startPosA[0];
        const verticalPathPosX = a_isHorizontal ? startPosB[1] : startPosA[1];

        const stepsToIntersectX = Math.abs(horizontalPathPosX - intersectPosX);
        const stepsToIntersectY = Math.abs(verticalPathPosX - intersectPosY);

        const stepsA = positionsA[i][1];
        const stepsB = positionsB[n][1];

        const steps = stepsToIntersectX + stepsToIntersectY + stepsA + stepsB;

        results.push([distance, steps]);
      }
    }
  }

  return results;
}

const intersections = getIntersections(pathsA, pathsB);

const closest = intersections.sort((a,b) => a[0] - b[0])[0][0];
const shortest = intersections.sort((a,b) => a[1] - b[1])[0][1];

console.log(closest);
console.log(shortest);