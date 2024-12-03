async function parseInput(): Promise<string> {
  const input = await Deno.readTextFile("day3/testinput.txt");
  return input.replace(/[\n]/g, "");
}

async function main() {
  const input = await parseInput();
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|(do\(\)|don't\(\))/g;

  let match;
  let total: number = 0;
  let enabled: boolean = true;

  while ((match = regex.exec(input)) !== null) {
    if (match[1] && match[2] && enabled) {
      total = total + match[1] * match[2];
    } else if (match[3]) {
      if (match[3] === "don't()") {
        enabled = false;
      } else {
        enabled = true;
      }
    }
  }

  console.log(total);
}

main();
