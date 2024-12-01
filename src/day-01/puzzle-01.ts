import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '01';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        const left: number[] = [];
        const right: number[] = [];
        const distances: number[] = [];

        let solution = '';

        this.input.lines.forEach((line) => {
            const parts = line.split('   ');

            left.push(parseInt(parts[0]));
            right.push(parseInt(parts[1]));
        });

        const leftSorted = _.sortBy(left);
        const rightSorted = _.sortBy(right);

        for (const [index, l] of leftSorted.entries()) {
            const r = rightSorted[index];
            const distance = Math.abs(r - l);
            distances.push(distance);
        }

        solution = _.sum(distances).toString();

        console.log('Solution:', solution);
        return solution;
    }
}
