async function parseInput(): Promise<string> {
  const input = await Deno.readTextFile("day3/input.txt");
  return input.replace(/[\n]/g, "");
}

async function main() {
  const input = await parseInput();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let match;
  let total: number = 0;

  while ((match = regex.exec(input)) !== null) {
    total = total + match[1] * match[2];
  }

  console.log(total);
}

main();
