import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '03';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let solution = 0;

        let muls: string[] = [];

        this.input.lines.forEach((line) => {
            muls = [...muls, ...(line.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g) as string[])];
        });

        console.log('Matches:', muls);

        let shouldMultiply = true;

        for (const mul of muls) {
            console.log('Match:', mul);

            if (mul === 'do()') {
                shouldMultiply = true;
                continue;
            } else if (mul === "don't()") {
                shouldMultiply = false;
                continue;
            }

            if (shouldMultiply) {
                const digits = mul.match(/\d{1,3}/g) as string[];

                const a = parseInt(digits[0]);
                const b = parseInt(digits[1]);

                console.log('Multiplying:', a, b);
                solution += a * b;
            }
        }

        console.log('Solution:', solution);

        return solution.toString();
    }
}
