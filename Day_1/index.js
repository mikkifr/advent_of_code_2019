const fs = require('fs');
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n')

/************************************* */

const calculateFuel = (input, recurse) => (
  input.map(
    mass => [mass]
      .map(m => m / 3)
      .map(Math.floor)
      .map(m => m - 2)
      .map(m => m < 0 ? 0 : m)
      .map(m => (recurse && m) ? m + calculateFuel([m], true) : m)
    [0]
  ).reduce((sum, fuel) => sum + fuel, 0)
)

const part_1 = calculateFuel(input);
const part_2 = calculateFuel(input, true);

console.log(part_1);
console.log(part_2);