import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '04';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        let loopCounter = 0;

        const directions = [
            [0, 1], // Right
            [0, -1], // Left
            [1, 0], // Down
            [-1, 0], // Up
            [1, 1], // Down-Right (Diagonal)
            [-1, -1], // Up-Left (Diagonal)
            [1, -1], // Down-Left (Diagonal)
            [-1, 1] // Up-Right (Diagonal)
        ];

        const rows = this.input.lines.length;
        const cols = this.input.lines[0].length;

        const matrix: string[][] = this.input.lines.map((l) => l.split(''));

        const results = [];

        _.range(rows).forEach((x) => {
            loopCounter++;
            _.range(cols).forEach((y) => {
                loopCounter++;

                directions.forEach(([dx, dy]) => {
                    loopCounter++;
                    if (this.checkDirection(x, y, dx, dy, 'XMAS', matrix, rows, cols, loopCounter)) {
                        results.push({ start: [x, y], direction: [dx, dy] });
                    }
                });
            });
        });

        console.log('Solution:', results.length);
        console.log('Loop Counter:', loopCounter);

        return results.length.toString();
    }

    public checkDirection(
        x: number,
        y: number,
        dx: number,
        dy: number,
        word: string,
        grid: string[][],
        rows: number,
        cols: number,
        loopCounter: number
    ): boolean {
        for (let i = 0; i < word.length; i++) {
            loopCounter++;

            const nx = x + i * dx;
            const ny = y + i * dy;

            if (nx < 0 || ny < 0 || nx >= rows || ny >= cols || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }
}
