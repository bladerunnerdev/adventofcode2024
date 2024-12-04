import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '04';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let loopCounter = 0;

        const directions = [
            [1, 1], // Down-Right (Diagonal)
            [-1, -1], // Up-Left (Diagonal)
            [1, -1], // Down-Left (Diagonal)
            [-1, 1] // Up-Right (Diagonal)
        ];

        const rows = this.input.lines.length;
        const cols = this.input.lines[0].length;

        const matrix: string[][] = this.input.lines.map((l) => l.split(''));

        const results: { start: number[] }[] = [];

        _.range(rows).forEach((row) => {
            loopCounter++;
            _.range(cols).forEach((col) => {
                loopCounter++;
                if (matrix[row][col] === 'A' && row > 0 && col > 0 && row < rows - 1 && col < cols - 1) {
                    const newMatrix = [
                        [matrix[row - 1][col - 1], matrix[row - 1][col], matrix[row - 1][col + 1]],
                        [matrix[row][col - 1], matrix[row][col], matrix[row][col + 1]],
                        [matrix[row + 1][col - 1], matrix[row + 1][col], matrix[row + 1][col + 1]]
                    ];

                    let masCount = 0;

                    _.range(3).forEach((newX) => {
                        loopCounter++;
                        _.range(3).forEach((newY) => {
                            loopCounter++;
                            // Check for the word in all 8 directions
                            directions.forEach(([dx, dy]) => {
                                loopCounter++;
                                if (this.checkDirection(newX, newY, dx, dy, 'MAS', newMatrix, 3, 3, loopCounter)) {
                                    masCount++;
                                }
                            });
                        });
                    });

                    if (masCount === 2) {
                        results.push({ start: [row, col] });
                    }
                }
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
