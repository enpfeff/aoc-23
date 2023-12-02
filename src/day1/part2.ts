import { readFile } from 'node:fs/promises';

const input = await getInput();
const lines = input.split('\n');
const total = lines.map(getNumbersFromLine).reduce(sumNumbers, 0);

console.log(`total: ${total}`);

async function getInput(): Promise<string> {
  const buffer = await readFile('./src/day1/input.txt');
  return buffer.toString();
}

export function sumNumbers(total: number, current: number): number {
  total += current;
  return total;
}

export function getNumbersFromLine(line: string): number {
  console.log(`unformatted line: ${line}`); // eslint-disable-line no-console
  const formattedLine = replaceStringNumbersWithNumbers(line).replaceAll(/[a-zA-Z]/g, '');
  console.log(`formatted line: ${formattedLine}`); // eslint-disable-line no-console

  const numbers = formattedLine.split('');
  if (numbers.length === 1) {
    const number = numbers[0];
    return parseInt(number + number);
  }

  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  return parseInt(firstNumber + lastNumber);
}

function replaceStringNumbersWithNumbers(line: string): string {
  const regexes = [
    {
      regex: /(two)/gi,
      replacement: 'two2two',
    },
    {
      regex: /(one)/gi,
      replacement: 'one1one',
    },
    {
      regex: /(three)/gi,
      replacement: 'three3three',
    },
    {
      regex: /(four)/gi,
      replacement: 'four4four',
    },
    {
      regex: /(five)/gi,
      replacement: 'five5five',
    },
    {
      regex: /(six)/gi,
      replacement: 'six6six',
    },
    {
      regex: /(seven)/gi,
      replacement: 'seven7seven',
    },
    {
      regex: /(eight)/gi,
      replacement: 'eight8eight',
    },
    {
      regex: /(nine)/gi,
      replacement: 'nine9nine',
    },
    {
      regex: /(zero)/gi,
      replacement: 'zero0zero',
    },
  ];

  return regexes.reduce((line, regex) => {
    return line.replaceAll(regex.regex, regex.replacement);
  }, line);
}
