import { readFile } from 'node:fs/promises';

const input = await getInput();
const lines = input.split('\n');
const total = lines.map(getNumbersFromLine).reduce(sumNumbers, 0);

console.log(total);

async function getInput(): Promise<string> {
  const buffer = await readFile('./src/day1/input.txt');
  return buffer.toString();
}

export function sumNumbers(total: number, current: number): number {
  total += current;
  return total;
}

export function getNumbersFromLine(line: string): number {
  const formattedLine = line.replaceAll(/[a-zA-Z]/g, '');
  const numbers = formattedLine.split('');
  if (numbers.length === 1) {
    const number = numbers[0];
    return parseInt(number + number);
  }

  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return parseInt(firstNumber + lastNumber);
}
