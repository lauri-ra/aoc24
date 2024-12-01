async function parseInput() {
  // Parse input
  const input = await Deno.readTextFile('day1/input.txt');

  // Separate input by lines
  const lines: any = input.trim().split('\n');

  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line: any) => {
    const [leftValue, rightValue] = line.split(/\s+/);
    left.push(Number(leftValue));
    right.push(Number(rightValue));
  });

  return [left, right];
}

function countOccurences(array: number[]) {
  // Count how many times each number appears in an array
  const countMap: Map<number, number> = new Map();

  for (const num of array) {
    // Set num as key, increment by 1 if found, else defaul to 0
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }

  return countMap;
}

function calculateSimilarity(left: number[], rightCounts: Map<number, number>) {
  const scores: number[] = [];

  for (const num of left) {
    const multiplier = rightCounts.get(num) || 0;
    const score = num * multiplier;
    scores.push(score);
  }

  return scores;
}

function calculateTotal(scores: number[]) {
  return scores.reduce((accumulator, currentValue) => accumulator + currentValue);
}

async function main() {
  const [left, right] = await parseInput();
  const rightCounts = countOccurences(right);
  const similarityScores = calculateSimilarity(left, rightCounts);
  const result = calculateTotal(similarityScores);
  console.log(result);
}

main();
