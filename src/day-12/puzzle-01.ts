import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '12';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        // https://en.wikipedia.org/wiki/Flood_fill
        let solution = '';

        const garden = this.input.lines.map((line) => line.split(''));

        const rows = garden.length;
        const cols = garden[0].length;

        const directions = [
            [0, 1], // Right
            [0, -1], // Left
            [1, 0], // Down
            [-1, 0] // Up
        ];

        for (let rowIndex = 0; rowIndex < garden.length; rowIndex++) {
            for (let colIndex = 0; colIndex < garden[0].length; colIndex++) {
                console.log('Plot square:', rowIndex, colIndex, garden[rowIndex][colIndex]);
            }
        }

        const queue: number[][] = [];

        console.log('Solution:', solution);
        return solution;
    }
}
