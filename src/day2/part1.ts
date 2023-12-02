import { readFile } from 'node:fs/promises';

const userInput = {
  green: 13,
  red: 12,
  blue: 14,
};

const lines = (await getInput()).split('\n');
const games = lines.map(parseInput);

const total = games.map(getValidGameNumber).reduce((acc, number) => {
  acc += number;
  return acc;
}, 0);

console.log(`total: ${total}`);
async function getInput(): Promise<string> {
  const buffer = await readFile('./src/day2/input.txt');
  return buffer.toString();
}

function getValidGameNumber(game: Game): number {
  let isValid = true;
  game.inputs.forEach(input => {
    const valid = validateInput(input);
    if (!valid) {
      isValid = false;
      return;
    }
  });
  return isValid ? game.id : 0;
  function validateInput(input: Input): boolean {
    let valid = true;
    Object.entries(input).forEach(([type, value]) => {
      if (value > userInput[type as InputType]) {
        valid = false;
        return;
      }
    });
    return valid;
  }
}

type InputType = 'red' | 'green' | 'blue';

type Input = {
  [K in InputType]: number;
};

type Game = {
  id: number;
  inputs: Array<Input>;
};

function parseInput(line: string): Game {
  const [gameId, rawGameInputs] = line.split(':');
  const id = parseInt(gameId.replaceAll(/[a-zA-Z]/g, '').trim());

  const start: Input = { red: 0, green: 0, blue: 0 };

  const inputs = rawGameInputs.split(';').map(input => {
    const cleanInput = input.trim();
    const inputs = cleanInput.split(',');
    return inputs.reduce((acc, input) => {
      const [value, type] = input.trim().split(' ');
      return { ...acc, [type]: parseInt(value) };
    }, start);
  });

  return {
    id,
    inputs,
  };
}
