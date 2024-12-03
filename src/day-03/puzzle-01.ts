import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '03';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        let solution = 0;

        let muls: string[] = [];

        this.input.lines.forEach((line) => {
            muls = [...muls, ...(line.match(/mul\(\d{1,3},\d{1,3}\)/g) as string[])];
        });

        console.log('Matches:', muls);

        for (const mul of muls) {
            const digits = mul.match(/\d{1,3}/g) as string[];

            const a = parseInt(digits[0]);
            const b = parseInt(digits[1]);

            console.log('Multiplying:', a, b);
            solution += a * b;
        }

        console.log('Solution:', solution);

        return solution.toString();
    }
}
