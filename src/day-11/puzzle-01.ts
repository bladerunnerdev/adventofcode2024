import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '11';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        const initialArray = this.input.lines[0].split(' ').map((x) => parseInt(x));

        const mutatedArrays: number[][] = [initialArray];

        console.log('Initial Array:', initialArray);

        let currentIteration = 0;

        while (currentIteration < 25) {
            const tempArray: number[] = [];

            for (const stone of mutatedArrays[currentIteration]) {
                if (stone === 0) {
                    tempArray.push(1);
                } else if (stone.toString().length % 2 === 0) {
                    const stoneString = stone.toString();
                    const midpoint = stoneString.length / 2;
                    const leftHalf = stoneString.slice(0, midpoint);
                    const rightHalf = stoneString.slice(midpoint);

                    tempArray.push(parseInt(leftHalf));
                    tempArray.push(parseInt(rightHalf));
                } else {
                    tempArray.push(stone * 2024);
                }
            }

            mutatedArrays.push(tempArray);

            currentIteration++;
        }

        console.log('Solution:', mutatedArrays[mutatedArrays.length - 1].length);
        return mutatedArrays[mutatedArrays.length - 1].length.toString();
    }
}
