import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '06';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let map: string[][] = [];

        this.input.lines.forEach((line) => {
            map.push(line.split(''));
        });

        const rows = map.length;
        const cols = map.length;

        const directions = [
            [-1, 0], // N
            [0, 1], // E
            [1, 0], // S
            [0, -1] // W
        ];

        // Locate the guard's initial position and direction
        let startRow: number = 0,
            startCol: number = 0,
            startDir: number = 0;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (map[row][col] === '^') {
                    startRow = row;
                    startCol = col;
                    startDir = 0;
                    break;
                }
            }
        }

        // Function to simulate guard movement with an optional extra obstacle
        const isInfiniteLoop = (obstacleRow: number, obstacleCol: number): boolean => {
            let guardRow = startRow,
                guardCol = startCol,
                guardDir = startDir;
            const visited = new Set();
            visited.add(`${guardRow},${guardCol},${guardDir}`);

            while (true) {
                const [dr, dc] = directions[guardDir];
                const nextRow = guardRow + dr;
                const nextCol = guardCol + dc;

                // Check if the next position is outside the grid
                if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
                    return false; // Guard exits the grid
                }

                // Treat the additional obstacle as if it's a `#`
                const nextCell = nextRow === obstacleRow && nextCol === obstacleCol ? '#' : map[nextRow][nextCol];
                if (nextCell === '#') {
                    // Obstacle ahead, turn right
                    guardDir = (guardDir + 1) % 4;
                } else {
                    // Move forward
                    guardRow = nextRow;
                    guardCol = nextCol;
                }

                const state = `${guardRow},${guardCol},${guardDir}`;
                if (visited.has(state)) {
                    return true; // Loop detected
                }
                visited.add(state);
            }
        };

        // Count valid positions for the new obstruction
        let validPositions = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Skip positions that are not empty or are the starting position
                if (map[r][c] === '#' || (r === startRow && c === startCol)) {
                    continue;
                }

                // Simulate guard movement with an obstacle at (r, c)
                if (isInfiniteLoop(r, c)) {
                    validPositions++;
                }
            }
        }

        console.log(`Number of valid positions for a new obstruction: ${validPositions}`);

        return validPositions.toString();
    }
}
