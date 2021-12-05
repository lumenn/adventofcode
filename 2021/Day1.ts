import { readFileSync } from "fs";

const input: string = readFileSync('./resources/2021/Day1.txt', 'utf-8')

const depth: number[] = input.split(/\n/g).map(v => +v)

// part 1

console.log(
  'Part 1: ', depth.filter((v, i) => v > depth[i-1]).length
)

// part 2

let sum = (p: number, v: number) => p + v;
let counter: number = 0;

let prev: number[] = depth.slice(0,3)

for (let i = 1; i < depth.length; i++) {
  if(i + 2 > depth.length) break;
  let current: number[] = depth.slice(i, i + 3)

  if (current.reduce(sum) > prev.reduce(sum)) {
    counter++;
  } 
  prev = current
}

console.log(`Part 2: ${counter}`)