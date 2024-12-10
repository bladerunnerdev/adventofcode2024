import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '10';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        let grid: number[][] = this.input.lines.map((line) => line.split('').map((char) => parseInt(char)));

        let validTrailCoordinates: number[][] = [];
        let validTuples: Set<string> = new Set<string>();

        for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
            for (let colIndex = 0; colIndex < grid.length; colIndex++) {
                if (grid[rowIndex][colIndex] === 0) {
                    this.checkSurroundings(
                        grid,
                        rowIndex,
                        colIndex,
                        rowIndex,
                        colIndex,
                        0,
                        validTrailCoordinates,
                        validTuples
                    );
                }
            }
        }

        console.log('Valid Trail Coordinates:', validTrailCoordinates);
        console.log('Valid Tuples:', validTuples);

        console.log('Solution:', validTuples.size);
        console.log('Solution2:', validTrailCoordinates.length);
        return validTrailCoordinates.length.toString();
    }

    public checkSurroundings(
        grid: number[][],
        startingRowIndex: number,
        startingColIndex: number,
        rowIndex: number,
        colIndex: number,
        currentElevation: number,
        trailCoordinates: number[][],
        validTuples: Set<string>
    ): void {
        // console.log('Checking row, col and elevation:', rowIndex + 1, colIndex + 1, currentElevation);

        if (currentElevation === 9) {
            console.log('Reached the end of the trail');
            trailCoordinates.push([rowIndex, colIndex]);
            validTuples.add(`${startingRowIndex},${startingColIndex}-${rowIndex},${colIndex}`);
            return;
        }

        const directions = [
            [0, 1], // Right
            [0, -1], // Left
            [1, 0], // Down
            [-1, 0] // Up
            // [1, 1], // Down-Right (Diagonal)
            // [-1, -1], // Up-Left (Diagonal)
            // [1, -1], // Down-Left (Diagonal)
            // [-1, 1] // Up-Right (Diagonal)
        ];

        for (let direction of directions) {
            const newRow = rowIndex + direction[0];
            const newCol = colIndex + direction[1];

            if (
                newRow >= 0 &&
                newRow < grid.length &&
                newCol >= 0 &&
                newCol < grid.length &&
                grid[newRow][newCol] === currentElevation + 1
            ) {
                this.checkSurroundings(
                    grid,
                    startingRowIndex,
                    startingColIndex,
                    newRow,
                    newCol,
                    currentElevation + 1,
                    trailCoordinates,
                    validTuples
                );
            }
        }
    }
}
