import { readFileSync } from 'fs';

const input: string = readFileSync('./resources/2021/Day5.txt', 'utf-8');

type Point = {
  x: number,
  y: number
}

class Vector2 {
  start: Point;
  end: Point;

  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
}

class GamePlane {
  area: number[][];

  constructor(xSize: number, ySize: number) {
    this.area = new Array(ySize + 1).fill(0).map(v => new Array(xSize + 1).fill(0))
  }

  public get amountOfPointsWith2Overlaps(): number {
    return [].concat(...this.area).filter(v => v >= 2).length;
  }


  public drawParallelVector(vector: Vector2) {
    let y = vector.start.y;

    for (let i = Math.min(vector.start.x, vector.end.x); i <= Math.max(vector.start.x, vector.end.x); i++) {
      this.area[y][i] += 1;
    }
  }

  public drawPerpendicularVector(vector: Vector2) {
    let x = vector.start.x;

    for (let i = Math.min(vector.start.y, vector.end.y); i <= Math.max(vector.start.y, vector.end.y); i++) {
      this.area[i][x] += 1;
    }
  }

  public draw45AngleVector(vector: Vector2) {
    for (let y = 0; y < this.area.length; y++) {
      for (let x = 0; x < this.area[y].length; x++) {
        if(this.isOnDiagonal(vector, x, y) && 
            x >= Math.min(vector.start.x, vector.end.x) &&
            x <= Math.max(vector.start.x, vector.end.x) && 
            y >= Math.min(vector.start.y, vector.end.y) &&
            y <= Math.max(vector.start.y, vector.end.y)) this.area[y][x] += 1;
      }
    }
  }

  private isOnDiagonal(vector: Vector2, x: number, y: number): boolean {
    return ((y - vector.start.y)*(vector.end.x - vector.start.x)) - ((vector.end.y - vector.start.y)*(x - vector.start.x)) === 0
  }
}

function readVectors(input: string[]): Vector2[] {
  const vectors: Vector2[] = [];
  input.forEach(line => {
    const values: [string, string] = line.split(/ -> /) as [string, string];
    const startPositions: [string, string] = values[0].split(/,/) as [string, string]
    const endPositions: [string, string] = values[1].split(/,/) as [string, string]

    const start: Point = {
      x: +startPositions[0],
      y: +startPositions[1]
    }
    const end: Point = {
      x: +endPositions[0],
      y: +endPositions[1]
    }

    vectors.push(new Vector2(start, end));
  });

  return vectors;
}

function findMax(vectors: Vector2[], dimension: 'x' | 'y'): number {
  let max: number = 0;
  for (let i = 0; i < vectors.length; i++) {
    const vector = vectors[i];

    if (vector.end[dimension] > max) {
      max = vector.end[dimension]
    }

    if (vector.start[dimension] > max) {
      max = vector.start[dimension]
    }
  }
  return max;
}

const vectors: Vector2[] = readVectors(input.split(/\n/g));
const maxX: number = findMax(vectors, 'x');
const maxY: number = findMax(vectors, 'y');
let plane: GamePlane = new GamePlane(maxX, maxY);

const isPerpendicular = (vector: Vector2) => vector.end.x === vector.start.x
const isParallel = (vector: Vector2) => vector.end.y === vector.start.y
const is45angle = (vector: Vector2) => Math.abs(vector.end.x - vector.start.x) === Math.abs(vector.end.y - vector.start.y)

vectors.forEach((vector) => {
  if (isPerpendicular(vector)) {
    plane.drawPerpendicularVector(vector);
  }
  if (isParallel(vector)) {
    plane.drawParallelVector(vector)
  }
})

console.log(`Part 1: ${plane.amountOfPointsWith2Overlaps}`)

let plane2: GamePlane = new GamePlane(maxX, maxY);

vectors.forEach((vector) => {
  if (isPerpendicular(vector)) {
    plane2.drawPerpendicularVector(vector);
    return;
  }
  if (isParallel(vector)) {
    plane2.drawParallelVector(vector);
    return;
  }
  if (is45angle(vector)) {
    plane2.draw45AngleVector(vector)
    return;
  }
})

console.log(`Part 2: ${plane2.amountOfPointsWith2Overlaps}`)