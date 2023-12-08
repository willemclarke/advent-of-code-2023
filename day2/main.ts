import fs from "node:fs";

// ---- Part One ----

type Set = {
	red: number;
	green: number;
	blue: number;
};

const criteria = { red: 12, green: 13, blue: 14 } as const;

function toGame(props: { id: number; sets: string[] }) {
	return {
		id: props.id,
		sets: props.sets.map((set) => {
			const setToArray = set.split(",");
			return setToArray.reduce<Set>(
				(acc, line) => {
					const [count, colour] = line.trim().split(" ");

					const countToInt = Number.parseInt(count);
					const prevCountToInt = Number.parseInt(acc[colour]);

					if (acc[colour]) {
						return { ...acc, [colour]: prevCountToInt + countToInt };
					}

					return { ...acc, [colour]: countToInt };
				},
				{ red: 0, green: 0, blue: 0 }
			);
		}),
	};
}

function getInput(path: string) {
	return fs
		.readFileSync(path, "utf-8")
		.split("\n")
		.map((line, index) => {
			const raw = {
				id: index + 1,
				sets: line
					.split(":")[1]
					.split(";")
					.map((str) => str.trim()),
			};

			return toGame(raw);
		});
}

function partOne() {
	const games = getInput("day2/input.txt");
	const possibleGames = games
		.flatMap((game) => {
			const possible = game.sets.every((game) => {
				return (
					game.red <= criteria.red &&
					game.green <= criteria.green &&
					game.blue <= criteria.blue
				);
			});

			if (possible) {
				return game.id;
			}

			return [];
		})
		.reduce((acc, curr) => acc + curr, 0);

	console.log({ possibleGames });
}

// ---- Part Two ----

function minimums(sets: Set[]) {
	return {
		red: sets.sort((a, b) => b.red - a.red)[0].red,
		green: sets.sort((a, b) => b.green - a.green)[0].green,
		blue: sets.sort((a, b) => b.blue - a.blue)[0].blue,
	};
}

function partTwo() {
	const games = getInput("day2/input.txt");

	const powers = games
		.map((game) => {
			const { red, green, blue } = minimums(game.sets);
			return red * green * blue;
		})
		.reduce((acc, curr) => acc + curr, 0);

	console.log({ powers });
}
