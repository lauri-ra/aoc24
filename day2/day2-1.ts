async function parseInput() {
  const input = await Deno.readTextFile("day2/input.txt");
  const lines: any = input.trim().split("\n");
  return lines;
}

function processNumbers(numbers: number[], isIncreasing: boolean): boolean {
  if (numbers.length === 1) {
    return true;
  }

  const currentNumber = numbers[0];
  const nextNumber = numbers[1];

  if (currentNumber > nextNumber && isIncreasing) {
    return false;
  }

  if (currentNumber < nextNumber && isIncreasing === false) {
    return false;
  }

  const increase = Math.abs(currentNumber - nextNumber);

  if (increase > 0 && increase < 4) {
    const nextNumbers = numbers.slice(1);
    return processNumbers(nextNumbers, isIncreasing);
  }

  return false;
}

async function main() {
  const data = await parseInput();
  let safeReports = 0;

  // Go through line of data
  for (const line of data) {
    const numbers = line.trim().split(" ").map(Number);

    let isIncreasing: boolean;

    if (numbers[0] > numbers[1]) {
      isIncreasing = false;
    } else {
      isIncreasing = true;
    }

    const isSafe = processNumbers(numbers, isIncreasing);

    if (isSafe) {
      safeReports = safeReports + 1;
    }
  }
  console.log(safeReports);
}

main();
