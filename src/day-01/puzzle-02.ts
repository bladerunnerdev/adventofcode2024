import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '01';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let solution = 0;

        const left: number[] = [];
        const right: number[] = [];

        this.input.lines.forEach((line) => {
            const parts = line.split('   ');

            left.push(parseInt(parts[0]));
            right.push(parseInt(parts[1]));
        });

        const rightCounted = _.countBy(right);

        for (const l of left) {
            solution += l * rightCounted[l] || 0;
        }

        console.log('Solution:', solution);

        return solution.toString();
    }
}
