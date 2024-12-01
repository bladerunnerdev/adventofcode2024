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
        let distance = 0;

        this.input.lines.forEach((line) => {
            const parts = line.split('   ');

            left.push(parseInt(parts[0]));
            right.push(parseInt(parts[1]));
        });

        const leftSorted = _.sortBy(left);
        const rightSorted = _.sortBy(right);

        for (const [index, l] of leftSorted.entries()) {
            const r = rightSorted[index];
            const diff = Math.abs(r - l);
            distance += diff;
        }

        console.log('Solution:', distance);

        return distance.toString();
    }
}
