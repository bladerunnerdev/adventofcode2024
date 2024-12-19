import { PuzzleBase } from '../puzzle-base';

interface ClawMachine {
    buttons: Button[];
    prizeCoordinates: number[];
}

interface Button {
    x: number;
    y: number;
}

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '13';
        super(dayNumber, '01', dryRun);
    }

    public solve(): string {
        const clawMachines: ClawMachine[] = [];
        let tempClawMachine: ClawMachine = { buttons: [], prizeCoordinates: [] };

        this.input.lines.forEach((line) => {
            if (line !== '') {
                const lineParts = line.split(':');

                const values = lineParts[1]
                    .trim()
                    .split(',')
                    .map((x) => +x.trim().substring(2));

                if (lineParts[0].startsWith('Button')) {
                    tempClawMachine.buttons.push({ x: values[0], y: values[1] });
                }

                if (lineParts[0].startsWith('Prize')) {
                    tempClawMachine.prizeCoordinates.push(values[0]);
                    tempClawMachine.prizeCoordinates.push(values[1]);
                }
            } else {
                clawMachines.push(tempClawMachine);
                tempClawMachine = { buttons: [], prizeCoordinates: [] };
            }
        });

        let totalAmountOfTokens = 0;

        clawMachines.forEach((clawMachine) => {
            console.log('Claw Machine:', JSON.stringify(clawMachine));

            const determinant =
                clawMachine.buttons[0].x * clawMachine.buttons[1].y -
                clawMachine.buttons[1].x * clawMachine.buttons[0].y;

            if (determinant === 0) {
                console.log('No solution');
                return;
            }

            const a =
                (clawMachine.prizeCoordinates[0] * clawMachine.buttons[1].y -
                    clawMachine.prizeCoordinates[1] * clawMachine.buttons[1].x) /
                determinant;

            const b =
                (clawMachine.buttons[0].x * clawMachine.prizeCoordinates[1] -
                    clawMachine.buttons[0].y * clawMachine.prizeCoordinates[0]) /
                determinant;

            if (Number.isInteger(a) && Number.isInteger(b) && a > 0 && b > 0) {
                console.log('Can reach prize with amount of button presses a and b:', a, b);
                totalAmountOfTokens += a * 3 + b;
            }
            //  else {
            //     console.log('No combination of button presses achieves the exact coordinates.');
            // }
        });

        console.log('Solution:', totalAmountOfTokens);
        return totalAmountOfTokens.toString();
    }
}
