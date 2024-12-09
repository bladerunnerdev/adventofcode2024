import { PuzzleBase } from '../puzzle-base';

export interface DiskBlock {
    isEmpty: boolean;
    amountOfBlocks: number;
    blockIndex?: number;
}

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '09';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        const line = this.input.lines[0];
        let currentBlockIndex = 0;
        const diskBlocks: DiskBlock[] = [];

        for (let index = 0; index < line.length; index++) {
            const charCount = parseInt(line[index]);

            if (index % 2 === 0) {
                diskBlocks.push({ isEmpty: false, amountOfBlocks: charCount, blockIndex: currentBlockIndex });
                currentBlockIndex++;
            } else {
                diskBlocks.push({ isEmpty: true, amountOfBlocks: charCount });
            }
        }

        // console.log('Disk blocks before sort:', diskBlocks);
        // console.log(
        //     'Disk blocks before sort:',
        //     diskBlocks
        //         .map((block) =>
        //             block.isEmpty
        //                 ? Array(block.amountOfBlocks).fill('.').join('')
        //                 : Array(block.amountOfBlocks).fill(block.blockIndex).join('')
        //         )
        //         .join('')
        // );

        for (let countDownIndex = diskBlocks.length - 1; countDownIndex >= 0; countDownIndex--) {
            const diskBlockToCheck = diskBlocks[countDownIndex];

            if (!diskBlockToCheck.isEmpty) {
                let emptyIndex = -1;

                for (let candidateIndex = 0; candidateIndex < countDownIndex; candidateIndex++) {
                    const candidate = diskBlocks[candidateIndex];

                    if (candidate.isEmpty && candidate.amountOfBlocks >= diskBlockToCheck.amountOfBlocks) {
                        emptyIndex = candidateIndex;
                        break;
                    }
                }

                if (emptyIndex === -1) {
                    continue;
                }

                const emptyBlock = diskBlocks[emptyIndex];

                if (emptyBlock.amountOfBlocks === diskBlockToCheck.amountOfBlocks) {
                    [diskBlocks[countDownIndex], diskBlocks[emptyIndex]] = [
                        diskBlocks[emptyIndex],
                        diskBlocks[countDownIndex]
                    ];
                } else {
                    const remainderCount = emptyBlock.amountOfBlocks - diskBlockToCheck.amountOfBlocks;

                    const exactEmptyGroup: DiskBlock = {
                        isEmpty: true,
                        amountOfBlocks: diskBlockToCheck.amountOfBlocks
                    };

                    const remainderEmptyGroup: DiskBlock = {
                        isEmpty: true,
                        amountOfBlocks: remainderCount
                    };

                    diskBlocks[emptyIndex] = exactEmptyGroup;

                    [diskBlocks[countDownIndex], diskBlocks[emptyIndex]] = [
                        diskBlocks[emptyIndex],
                        diskBlocks[countDownIndex]
                    ];

                    diskBlocks.splice(emptyIndex + 1, 0, remainderEmptyGroup);
                }
            }
        }

        // console.log('Disk blocks after sort:', diskBlocks);
        // console.log(
        //     'Disk blocks after sort:',
        //     diskBlocks
        //         .map((block) =>
        //             block.isEmpty
        //                 ? Array(block.amountOfBlocks).fill('.').join('')
        //                 : Array(block.amountOfBlocks).fill(block.blockIndex).join('')
        //         )
        //         .join('')
        // );

        let factor = 0;
        let checksum = 0;

        for (const block of diskBlocks) {
            if (!block.isEmpty) {
                for (let i = 0; i < block.amountOfBlocks; i++) {
                    checksum += factor * block.blockIndex!;
                    factor++;
                }
            } else {
                factor += block.amountOfBlocks;
            }
        }

        console.log('Solution:', checksum);
        return checksum.toString();
    }
}
