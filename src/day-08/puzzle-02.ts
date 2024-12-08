import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '08';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        const dict: Map<string, number[][]> = new Map<string, number[][]>();
        const antiNodes: Set<string> = new Set();

        let rows = this.input.lines.length;
        let cols = this.input.lines[0].length;

        this.input.lines.forEach((line, rowIndex) => {
            const chars = line.split('');

            for (const [colIndex, char] of chars.entries()) {
                if (char !== '.') {
                    if (!dict.has(char)) {
                        dict.set(char, [[rowIndex, colIndex]]);
                    } else {
                        dict.get(char)!.push([rowIndex, colIndex]);
                    }
                }
            }
        });

        for (const [key, value] of dict) {
            console.log('Key:', key);
            console.log('Value:', value);

            for (const [firstRowIndex, firstColIndex] of value) {
                antiNodes.add(`${firstRowIndex},${firstColIndex}`);

                for (const [secondRowIndex, secondColIndex] of value) {
                    antiNodes.add(`${secondRowIndex},${secondColIndex}`);

                    if (firstRowIndex !== secondRowIndex && firstColIndex !== secondColIndex) {
                        const rowDiff = secondRowIndex - firstRowIndex;
                        const colDiff = secondColIndex - firstColIndex;

                        let oppositeRow = firstRowIndex - rowDiff;
                        let oppositeCol = firstColIndex - colDiff;

                        while (oppositeRow < rows && oppositeCol < cols && oppositeRow >= 0 && oppositeCol >= 0) {
                            console.log('Adding anti-node at:', `${oppositeRow + 1},${oppositeCol + 1}`);
                            antiNodes.add(`${oppositeRow},${oppositeCol}`);

                            oppositeRow -= rowDiff;
                            oppositeCol -= colDiff;
                        }
                    }
                }
            }
        }

        console.log('Anti-nodes:', antiNodes);

        console.log('Solution:', antiNodes.size);
        return antiNodes.size.toString();
    }
}
