import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '09';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        const line = this.input.lines[0];
        let currentBlockIndex = 0;
        const diskBlocks: string[] = [];

        for (let index = 0; index < line.length; index++) {
            const charCount = parseInt(line[index]);

            if (index % 2 === 0) {
                for (let charAmount = 0; charAmount < charCount; charAmount++) {
                    diskBlocks.push(currentBlockIndex.toString());
                }

                currentBlockIndex++;
            } else {
                for (let charAmount = 0; charAmount < charCount; charAmount++) {
                    diskBlocks.push('.');
                }
            }
        }

        fs.writeFileSync(path.join(__dirname, 'disk_blocks_before_sort.txt'), diskBlocks.join(''), 'utf8');

        let lastBlockIndex = diskBlocks.length - 1;
        let checksum = 0;

        for (const [index, block] of diskBlocks.entries()) {
            if (block === '.') {
                while (lastBlockIndex > index && diskBlocks[lastBlockIndex] === '.') {
                    lastBlockIndex--;
                }

                if (lastBlockIndex > index) {
                    this.swap(diskBlocks, index, lastBlockIndex);
                    lastBlockIndex--;
                }
            }
        }

        fs.writeFileSync(path.join(__dirname, 'disk_blocks_after_sort.txt'), diskBlocks.join(''), 'utf8');

        let multiplicationLog = '';

        for (const [index, block] of diskBlocks.entries()) {
            if (block !== '.') {
                multiplicationLog += `Multiply ${index} * ${block}\n`;
                checksum += index * parseInt(block);
            }
        }

        fs.writeFileSync(path.join(__dirname, 'multiplication_log.txt'), multiplicationLog, 'utf8');

        console.log('Solution:', checksum);
        return checksum.toString();
    }

    private swap(array: string[], firstEmptyBlockIndex: number, lastWrittenBlockIndex: number): void {
        const firstBlock = _.get(array, firstEmptyBlockIndex);
        const lastBlock = _.get(array, lastWrittenBlockIndex);
        _.set(array, lastWrittenBlockIndex, firstBlock);
        _.set(array, firstEmptyBlockIndex, lastBlock);
    }
}
