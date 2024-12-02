import { PuzzleBase } from '../puzzle-base';

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '02';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        let numberOfSafeReports = 0;

        const reports = this.input.lines.map((line) => {
            return line.split(' ').map((num) => parseInt(num));
        });

        for (const report of reports) {
            let reportIsSafe = true;
            let increasing = report[0] < report[1];

            for (const [index, value] of report.entries()) {
                if (index > 0) {
                    if (
                        (value < report[index - 1] && increasing) ||
                        (value > report[index - 1] && !increasing) ||
                        Math.abs(value - report[index - 1]) < 1 ||
                        Math.abs(value - report[index - 1]) > 3
                    ) {
                        reportIsSafe = false;
                        break;
                    }
                }
            }

            if (reportIsSafe) {
                numberOfSafeReports++;
            }
        }

        console.log('Solution:', numberOfSafeReports);
        return numberOfSafeReports.toString();
    }
}
