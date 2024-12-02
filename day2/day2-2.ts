async function parseInput(): Promise<number[][]> {
  const input = await Deno.readTextFile("day2/input.txt");
  const lines = input.trim().split("\n");
  return lines.map((line) => line.trim().split(" ").map(Number));
}

function processNumbers(numbers: number[]): boolean {
  const isIncreasing = numbers[0] < numbers[1];

  for (let i = 0; i < numbers.length - 1; i++) {
    const current = numbers[i];
    const next = numbers[i + 1];

    if (!safeDistance(current, next)) {
      return false;
    }

    if (isIncreasing && current > next) {
      return false;
    }
    if (!isIncreasing && current < next) {
      return false;
    }
  }
  return true;
}

function validateLine(numbers: number[]): boolean {
  for (let i = 0; i < numbers.length; i++) {
    const modifiedNumbers = numbers.slice(0, i).concat(numbers.slice(i + 1));
    if (processNumbers(modifiedNumbers)) {
      return true;
    }
  }
  return false;
}

function safeDistance(first: number, second: number): boolean {
  const distance = Math.abs(second - first);
  return distance >= 1 && distance <= 3;
}

async function main() {
  const data = await parseInput();
  let safeReports = 0;

  for (const numbers of data) {
    if (processNumbers(numbers)) {
      safeReports++;
    } else if (validateLine(numbers)) {
      safeReports++;
    }
  }
  console.log(safeReports);
}

main();
