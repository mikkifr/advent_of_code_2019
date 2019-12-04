const fs = require('fs');
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8")

/************************************* */

const run = (pos1, pos2) => {
  let program = input.split(",").map(i => +i);

  program[1] = pos1;
  program[2] = pos2;

  for(let i = 0, p = program; i <= p.length; i += 4) {
    if(p[i] === 99) break;
    if(p[i] === 1) p[p[i + 3]] = p[p[i + 1]] + p[p[i + 2]];
    if(p[i] === 2) p[p[i + 3]] = p[p[i + 1]] * p[p[i + 2]];
  }

  return program[0];
}

const findPairs = (val) => {
  const sample1 = run(0,0);
  const sample2 = run(1,0);
  const diff = sample2 - sample1;
  const noun = Math.floor(val / diff);
  const verb = (val % diff) - sample1;

  return [noun, verb];
}

const pairs = findPairs(19690720);

console.log(run(12,2));
console.log(100 * pairs[0] + pairs[1]);