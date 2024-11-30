import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '00';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let solution = '';

        this.input.lines.forEach((line) => {
            console.log('Line:', line);
            solution += line;
        });

        console.log('Solution:', solution);
        return solution;
    }
}
