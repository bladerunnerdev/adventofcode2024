import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '07';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let solution = 0;

        let testValues: Map<number, number[]> = new Map<number, number[]>();

        this.input.lines.forEach((line) => {
            let values = line.split(':');
            let key = parseInt(values[0]);
            let numbers = values[1]
                .trim()
                .split(' ')
                .map((num) => parseInt(num));
            testValues.set(key, numbers);
        });

        testValues.forEach((value, key) => {
            const n = value.length - 1;

            console.log(`Key: ${key}, Value: ${value}`);

            const operatorPermutations: number[][] = this.generatePermutations(n);

            for (const operators of operatorPermutations) {
                let result = value[0];

                for (let i = 0; i < n; i++) {
                    if (operators[i] === 0) {
                        result += value[i + 1];
                    }

                    if (operators[i] === 1) {
                        result *= value[i + 1];
                    }

                    if (operators[i] === 2) {
                        result = parseInt(result.toString().concat(value[i + 1].toString()));
                    }
                }

                if (result === key) {
                    console.log(`Result equals key: ${key} = ${result} with operators: ${operators}`);
                    solution += key;
                    break;
                }
            }
        });

        console.log('Solution:', solution);
        return solution.toString();
    }

    private generatePermutations(n: number): number[][] {
        const results: number[][] = [];

        function backtrack(current: number[]) {
            if (current.length === n) {
                results.push([...current]);
                return;
            }

            for (let val of [0, 1, 2]) {
                current.push(val);
                backtrack(current);
                current.pop();
            }
        }

        backtrack([]);
        return results;
    }
}
