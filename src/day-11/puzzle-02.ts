import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '11';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        const initialArray = this.input.lines[0].split(' ').map((x) => parseInt(x));

        const mutatedArrays: Map<number, number[]> = new Map<number, number[]>();
        mutatedArrays.set(0, initialArray);

        console.log('Initial Array:', initialArray);

        let currentIteration = 0;

        while (currentIteration < 75) {
            const tempArray: number[] = [];
            const currentArray = mutatedArrays.get(currentIteration);

            for (const stone of currentArray!) {
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

            currentIteration++;

            mutatedArrays.set(currentIteration, tempArray);
        }

        console.log('Solution:', mutatedArrays.get(currentIteration)!.length);
        return 'Solution: ' + mutatedArrays.get(currentIteration)!.length;
    }
}
