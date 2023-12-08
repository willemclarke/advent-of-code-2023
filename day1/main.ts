import fs from "node:fs";

function getInput(path: string) {
	return fs
		.readFileSync(path, "utf-8")
		.split("\n")
		.filter((line) => line !== "");
}

function partOne() {
	const input = getInput("day1/input.txt");

	const answer = input
		.map((line) => {
			const characters = line.split("");
			const toDigits = characters
				.filter((char) => !isNaN(Number(char)))
				.map(Number);

			const first = toDigits[0];
			const last = toDigits[toDigits.length - 1];
			return Number.parseInt(`${first}${last}`);
		})
		.reduce((acc, curr) => acc + curr, 0);

	console.log({ answer });
	return answer;
}

partOne();

// const numbersMap = {
// 	"0": "zero",
// 	"1": "one",
// 	"2": "two",
// 	"3": "three",
// 	"4": "four",
// 	"5": "five",
// 	"6": "six",
// 	"7": "seven",
// 	"8": "eight",
// 	"9": "nine",
// };
