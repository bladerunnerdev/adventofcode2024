import { PuzzleBase } from '../puzzle-base';

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '02';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let numberOfSafeReports = 0;

        const reports = this.input.lines.map((line) => {
            return line.split(' ').map((num) => parseInt(num));
        });

        for (const report of reports) {
            if (this.isSafe(report)) {
                numberOfSafeReports++;
            } else {
                for (const [index, value] of report.entries()) {
                    const tempArray = report.filter((_, i) => i !== index);

                    if (this.isSafe(tempArray)) {
                        numberOfSafeReports++;
                        break;
                    }
                }
            }
        }

        console.log('Solution:', numberOfSafeReports);
        return numberOfSafeReports.toString();
    }

    isSafe(report: number[]): boolean {
        let increasing = report[0] < report[1];

        for (const [index, value] of report.entries()) {
            if (index > 0) {
                const previousValue = report[index - 1];
                const diff = Math.abs(value - previousValue);

                if ((value < previousValue && increasing) || (value > previousValue && !increasing)) {
                    return false;
                }

                if (diff < 1 || diff > 3) {
                    return false;
                }
            }
        }

        return true;
    }
}
