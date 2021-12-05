import { readFileSync } from "fs";

const input: string = readFileSync('./resources/2021/Day2.txt', 'utf-8');


// part 1
let x: number = 0;
let y: number = 0;

input.split(/\n/g).forEach((v) => {
  let line: string[] = v.split(/ /g);
  if (line[0] === 'down') {
    y += +line[1]
  }
  if (line[0] === 'up') {
    y -= +line[1]
  }
  if (line[0] === 'forward') {
    x += +line[1]
  }
})

console.log(`Part 1 - X: ${x}, Y: ${y}, *: ${x * y}`)

// part 2

let aim: number = 0;
x = 0;
y = 0;

input.split(/\n/g).forEach((v) => {
  let line: string[] = v.split(/ /g);
  if (line[0] === 'down') {
    aim += +line[1]
  }
  if (line[0] === 'up') {
    aim -= +line[1]
  }
  if (line[0] === 'forward') {
    x += +line[1]
    y += aim * +line[1]
  }
})

console.log(`Part 2 - X: ${x}, Y: ${y}, *: ${x * y}`)