import { readFileSync } from "fs";

const input: string = readFileSync('./resources/2021/Day3.txt', 'utf-8');


// part 1
const rows: string[] = input.split(/\n/g);

type common = {
  '0': number;
  '1': number;
}

function countOccurences(rows: string[]): common[] {
  let occurences: common[] = new Array(rows[0].length)

  for (let i = 0; i < occurences.length; i++) {
    occurences[i] = {'0': 0, '1': 0};
  }

  rows.forEach((row) => {
    let characters: string[] = Array.from(row);
    characters.forEach((char, i) => {
      if (char === '0') {
        occurences[i][0]++;
      } else {
        occurences[i][1]++;
      }
    })
  })

  return occurences;
}

const mostCommon: number[] = countOccurences(rows).map((v) => v[0] > v[1] ? 0 : 1)
const leastCommon: number[] = countOccurences(rows).map((v) => v[1] > v[0] ? 0 : 1)

const gammaRate: number = parseInt(mostCommon.join(''), 2);
const epsilonRate: number = parseInt(leastCommon.join(''), 2);
 
console.log(`Part 1 - gamma: ${gammaRate}, epsilon: ${epsilonRate}, power: ${gammaRate * epsilonRate}`);

// part 2

function findOxygenGeneratorRating(rows: string[], position: number, occurences: common[]): string {
  let filtered: string[];
  let mostCommonNumberAtPosition: number = occurences[position][1] >= occurences[position][0] ? 1 : 0;

  filtered = rows.filter((v) => +v[position] === mostCommonNumberAtPosition);

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    let newPosition: number = position + 1;
    return findOxygenGeneratorRating(filtered, newPosition, countOccurences(filtered));
  }
}

function findCO2ScrubberRating(rows: string[], position: number, occurences: common[]): string {
  let filtered: string[];
  let leastCommonNumberAtPosition: number = occurences[position][0] <= occurences[position][1] ? 0 : 1;

  filtered = rows.filter((v) => +v[position] === leastCommonNumberAtPosition);

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    let newPosition: number = position + 1;
    return findCO2ScrubberRating(filtered, newPosition, countOccurences(filtered));
  }
}

const oxygenGeneratorRating: number = parseInt(findOxygenGeneratorRating(rows, 0, countOccurences(rows)),2);
const co2scrubberRating: number = parseInt(findCO2ScrubberRating(rows, 0 , countOccurences(rows)),2);

console.log(`Part 2 - oxygen: ${oxygenGeneratorRating}, co2: ${co2scrubberRating}, life: ${oxygenGeneratorRating * co2scrubberRating}`);