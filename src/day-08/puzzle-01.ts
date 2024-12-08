import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '08';
        super(dayNumber, '01', dryRun);
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
                for (const [secondRowIndex, secondColIndex] of value) {
                    if (firstRowIndex !== secondRowIndex && firstColIndex !== secondColIndex) {
                        const rowDiff = secondRowIndex - firstRowIndex;
                        const colDiff = secondColIndex - firstColIndex;

                        const oppositeRow = firstRowIndex - rowDiff;
                        const oppositeCol = firstColIndex - colDiff;

                        // const distance = Math.round(Math.sqrt(rowDiff * rowDiff + colDiff * colDiff));
                        // console.log(
                        //     `Pair: (${firstRowIndex},${firstColIndex}) & (${secondRowIndex},${secondColIndex})`
                        // );
                        // console.log(`Distance between them: ${distance}`);
                        // console.log(
                        //     `Opposite point of (${secondRowIndex},${secondColIndex}) relative to (${firstRowIndex},${secondColIndex}) is (${oppositeRow},${oppositeCol})`
                        // );
                        // console.log('-------------------');

                        if (oppositeRow < rows && oppositeCol < cols && oppositeRow >= 0 && oppositeCol >= 0) {
                            console.log('Adding anti-node at:', `${oppositeRow + 1},${oppositeCol + 1}`);
                            antiNodes.add(`${oppositeRow},${oppositeCol}`);
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
