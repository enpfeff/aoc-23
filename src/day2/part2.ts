import { readFile } from 'node:fs/promises';

const lines = (await getInput()).split('\n');
const games = lines.map(parseInput);

const total = games.map(getValidGamePower).reduce((acc, number) => {
  acc += number;
  return acc;
}, 0);

console.log(`total: ${total}`);
async function getInput(): Promise<string> {
  const buffer = await readFile('./src/day2/input.txt');
  return buffer.toString();
}

function getValidGamePower(game: Game): number {
  const max = game.inputs.reduce(
    (max, input) => {
      if (input.red > max.red) {
        max.red = input.red;
      }
      if (input.green > max.green) {
        max.green = input.green;
      }
      if (input.blue > max.blue) {
        max.blue = input.blue;
      }
      return max;
    },
    { red: 1, green: 1, blue: 1 }
  );

  return max.red * max.green * max.blue;
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

  const start: Input = { red: 1, green: 1, blue: 1 };

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
