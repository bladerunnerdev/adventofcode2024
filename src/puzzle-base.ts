import * as fs from 'fs';
import * as path from 'path';

export interface PuzzleInput {
    filePath: string;
    fileContent: string;
    lines: string[];
}

export class PuzzleBase {
    public input: PuzzleInput;

    constructor(day: string, puzzle: string, dryRun: boolean) {
        console.log(`Solving puzzle ${puzzle} on day ${day} with dry run: ${dryRun}`);

        const filePath = path.join(__dirname, `day-${day}/input-${dryRun ? 'sample-' : ''}${puzzle}.txt`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split(/\r\n|\r|\n/);

        this.input = {
            filePath,
            fileContent,
            lines
        };
    }
}
