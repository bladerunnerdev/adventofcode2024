// TODO: change day number
import { Puzzle01 } from './day-08/puzzle-01';
import { Puzzle02 } from './day-08/puzzle-02';

const puzzleNumber = process.argv[2];
const dryRun = process.argv[3] !== 'false';

console.log(`Starting puzzle ${puzzleNumber} with dry run: ${dryRun}`);

let puzzle: Puzzle01 | Puzzle02 | null = null;

switch (puzzleNumber) {
    case '01':
        puzzle = new Puzzle01(dryRun);
        break;
    case '02':
        puzzle = new Puzzle02(dryRun);
        break;
    default:
        console.log('No puzzle number specified, not running anything');
        break;
}

const startTime = performance.now();

if (puzzle) {
    puzzle.solve();
}

const endTime = performance.now();

console.log(`Execution time: ${endTime - startTime}ms`);
