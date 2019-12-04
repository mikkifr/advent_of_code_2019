const fs = require('fs');
const path = require('path')
const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')

/************************************* */

const requiredFuel = input
  .trim()
  .split('\n')
  .map(
    mass => [mass]
      .map(m => m / 3)
      .map(Math.floor)
      .map(m => m - 2)
  )
  .reduce((sum, [fuel]) => sum + fuel, 0)

console.log(requiredFuel)
