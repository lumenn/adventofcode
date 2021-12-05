import { readFileSync } from "fs";

const input: string = readFileSync('./resources/2021/Day4.txt', 'utf-8');
const inputRows: string[] = input.split(/\n/g);


type bingoCard = {
  numbers: number[][],
  marked: boolean[][],
  hasWon: boolean
};

function prepareCards(inputRows: string[]): bingoCard[] {
  const bingoCards: bingoCard[] = [];
  let bingoCard: bingoCard = {numbers: [], marked: [], hasWon: false};
  
  for (let i = 2; i < inputRows.length; i++) {
    const row = inputRows[i];
    if (row === '') continue;
    
    bingoCard.numbers.push(row.trim().split(/\s+/).map(v => +v));
    
    if (bingoCard.numbers.length === 5) {
      bingoCard.marked = new Array(5).fill(false).map(v => new Array(5).fill(false));
      bingoCards.push(bingoCard)
      bingoCard = {numbers: [], marked: [], hasWon: false};
    }
  }
  return bingoCards;
}

const prepareBingoNumbers = ((row: string) => row.split(/,/).map(v => +v));

const cards: bingoCard[] = prepareCards(inputRows);
const bingoNumbers: number[] = prepareBingoNumbers(inputRows[0])


function markNumber(card: bingoCard, bingoNumber: number): void {
  card.numbers.forEach((numbersRow, i) => {
    numbersRow.forEach((value, j) => {
      if (value === bingoNumber) {
        card.marked[i][j] = true;
      }
    })
  })
}

function checkIfBingo(card: bingoCard): boolean {
  // horizontal
  let isBingo: boolean = false;

  for (let i = 0; i < card.marked.length; i++) {
    const markedRow = card.marked[i];
    isBingo = markedRow.reduce((prev, current) => prev && current)

    if (isBingo) return isBingo;
  }

  // vertical
  let counter: number = 0
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (card.marked[j][i]) {
        counter++;

        if(counter === 5) {
          isBingo = true;
          return isBingo;
        }
      };
    }
    counter = 0;
  }
}

function playBingo(bingoNumbers: number[], cards: bingoCard[]): {winningCard: bingoCard, winningNumber: number} {
  for (let i = 0; i < bingoNumbers.length; i++) {
    const bingoValue: number = bingoNumbers[i];
    
    for (let j = 0; j < cards.length; j++) {
      const card: bingoCard = cards[j];
      
      markNumber(card, bingoValue);
  
      if (checkIfBingo(card)) {
        console.log(`Bingo with card ${i}, v= ${bingoValue}`);
        return {
          'winningCard': card, 
          'winningNumber': bingoValue
        };
      }
    }
  }
}

function playBingoToLastCard(bingoNumbers: number[], cards: bingoCard[]): {winningCard: bingoCard, winningNumber: number} {
  for (let i = 0; i < bingoNumbers.length; i++) {
    const bingoValue: number = bingoNumbers[i];
    
    for (let j = 0; j < cards.length; j++) {
      const card: bingoCard = cards[j];
      
      markNumber(card, bingoValue);
  
      if (checkIfBingo(card)) {
        card.hasWon = true;

        if (isLastBingo(cards)) {
          return {
            'winningCard': card, 
            'winningNumber': bingoValue
          };
        }
      }
    }
  }
}

function isLastBingo(cards: bingoCard[]): boolean {
  return cards.filter(v => v.hasWon).length === cards.length;
}

function countPoints(card: bingoCard): number {
  let points: number = 0;

  for (let i = 0; i < card.marked.length; i++) {
    const markedRow = card.marked[i];
    
    for (let j = 0; j < markedRow.length; j++) {
      const isMarked = markedRow[j];
      
      if (!isMarked) {
        points += card.numbers[i][j];
      }
    }
  }

  return points;
}

let { winningCard, winningNumber } = playBingo(bingoNumbers, cards);
let points: number = countPoints(winningCard);

console.log(`Winning number: ${winningNumber}, card points: ${points}, final score: ${winningNumber * points}`)

let { winningCard: w, winningNumber: n } = playBingoToLastCard(bingoNumbers, cards);
points = countPoints(w)

console.log(`Winning number: ${n}, card points: ${points}, final score: ${n * points}`);