import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '11';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let stones: Map<number, number> = new Map<number, number>();

        this.input.lines[0].split(' ').forEach((stone) => {
            stones.set(parseInt(stone), 1);
        });

        for (let index = 0; index < 75; index++) {
            const newStones: Map<number, number> = new Map<number, number>();

            for (const [stone, count] of stones.entries()) {
                const tempArray: number[] = [];

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

                for (const tempStone of tempArray) {
                    // If stone is not in newStones, set it to count, otherwise add count to existing value
                    newStones.set(tempStone, (newStones.get(tempStone) || 0) + count);
                }
            }

            stones = newStones;
        }

        console.log(
            'Solution:',
            Array.from(stones.values()).reduce((a, b) => a + b, 0)
        );
        return 'Solution';
    }
}
