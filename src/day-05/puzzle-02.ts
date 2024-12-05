import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export interface Position {
    before: number[];
    after: number[];
}

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '05';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let solution = 0;

        const dict: { [key: number]: Position } = {};
        const updates: number[][] = [];
        let isRule: boolean = true;

        for (const line of this.input.lines) {
            if (line === '') {
                isRule = false;
                continue;
            }

            if (isRule) {
                const parts = line.split('|');

                const page1 = parseInt(parts[0]);
                const page2 = parseInt(parts[1]);

                if (!dict[page1]) {
                    dict[page1] = { before: [page2], after: [] };
                } else {
                    dict[page1].before.push(page2);
                }

                if (!dict[page2]) {
                    dict[page2] = { before: [], after: [page1] };
                } else {
                    dict[page2].after.push(page1);
                }
            } else {
                updates.push(line.split(',').map((c) => parseInt(c)));
            }
        }

        for (const update of updates) {
            let isValidUpdate = false;

            for (const [index, page] of update.entries()) {
                if (index < update.length - 1) {
                    if (dict[page].before.includes(update[index + 1])) {
                        isValidUpdate = true;
                    } else {
                        isValidUpdate = false;
                        break;
                    }
                }
            }

            if (!isValidUpdate) {
                const sortedUpdate: number[] = [];

                for (const [index, page] of update.entries()) {
                    if (_.isEmpty(sortedUpdate)) {
                        sortedUpdate.push(page);
                    } else {
                        const previousPage = sortedUpdate[index - 1];

                        if (dict[previousPage].before.includes(page)) {
                            sortedUpdate.push(page);
                        } else {
                            for (const [i, sortedPage] of sortedUpdate.entries()) {
                                if (dict[page].before.includes(sortedPage)) {
                                    sortedUpdate.splice(i, 0, page);
                                    break;
                                }
                            }
                        }
                    }
                }

                const middleElement = _.nth(sortedUpdate, Math.floor(update.length / 2));
                solution += middleElement!;
            }
        }

        console.log('Solution:', solution);
        return solution.toString();
    }
}
