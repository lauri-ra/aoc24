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

function calculateDistances(left: number[], right: number[], distanceResults: number[]) {
  if (left.length === 0 || right.length === 0) {
    return distanceResults;
  }

  // Get smallest value from left and remove it
  const minLeft = Math.min(...left);
  const minLeftIndex = left.indexOf(minLeft);
  left.splice(minLeftIndex, 1);

  // Get smallest value from right and remove it
  const minRight = Math.min(...right);
  const minRightIndex = right.indexOf(minRight);
  right.splice(minRightIndex, 1);

  // Get distance between left and right and save it
  const distance = Math.abs(minLeft - minRight);
  distanceResults.push(distance);

  return calculateDistances(left, right, distanceResults);
}

function calculateTotal(distances: number[]) {
  return distances.reduce((accumulator, currentValue) => accumulator + currentValue);
}

async function main() {
  const [left, right] = await parseInput();
  const distanceResults = calculateDistances(left, right, []);
  const toatlDistance = calculateTotal(distanceResults);
  console.log(toatlDistance);
}

main();
