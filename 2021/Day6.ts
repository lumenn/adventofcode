import { readFileSync } from 'fs';

const input: string = readFileSync('./resources/2021/Day6.txt', 'utf-8');
let lanternFishes: {
  '0': number,
  '1': number,
  '2': number,
  '3': number,
  '4': number,
  '5': number,
  '6': number,
  '7': number,
  '8': number,
} = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  '5': 0,
  '6': 0,
  '7': 0,
  '8': 0,
}

input.split(/,/).forEach(v => {
  lanternFishes[`${v}`] += 1;
})

const daysToSimulate: number = 256;

for (let day = 0; day < daysToSimulate; day++) {
  let newFishes: number = 0;
  newFishes = lanternFishes[0]

  Object.keys(lanternFishes).forEach(key => {
    if (+key < 8) {
      lanternFishes[key] = lanternFishes[+key+1]
      if (+key === 6) lanternFishes[key] += newFishes;
    } else if (+key === 8) {
      lanternFishes[key] = newFishes
    }
  })
}

let amountOfFishes: number = 0;
Object.keys(lanternFishes).forEach(key => amountOfFishes += lanternFishes[key])

console.log(`Amount of fishes: ${amountOfFishes}`)
