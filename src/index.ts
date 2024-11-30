import { Puzzle01 } from './day-00/puzzle-01';
import { Puzzle02 } from './day-00/puzzle-02';

const puzzleNumber = process.argv[2];
const dryRun = process.argv[3] !== 'false';

console.log(`Starting puzzle ${puzzleNumber} with dry run: ${dryRun}`);

switch (puzzleNumber) {
    case '01':
        new Puzzle01(dryRun).solve();
        break;
    case '02':
        new Puzzle02(dryRun).solve();
        break;
    default:
        console.log('No puzzle number specified, not running anything');
        break;
}
