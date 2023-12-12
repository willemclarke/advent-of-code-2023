import fs from "node:fs";

function getInput(path: string) {
	return fs
		.readFileSync(path, "utf-8")
		.split("\n")
		.map((line) => {
			const [winning, numbers] = line.split(":")[1].trim().split("|");

			return {
				winning: winning.split(" ").filter((x) => x !== ""),
				numbers: numbers.split(" ").filter((x) => x !== ""),
			};
		});
}

function partOne() {
	const input = getInput("day4/input.txt");

	const result = input
		.flatMap(({ winning, numbers }) => {
			const matching = winning.filter((char) => numbers.includes(char));

			if (matching.length === 0) {
				return [];
			}

			return Math.pow(2, matching.length - 1);
		})
		.reduce((acc, curr) => acc + curr, 0);

	console.log({ result });
}

partOne();
