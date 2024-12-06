import chalk from 'chalk';
import { PuzzleBase } from '../puzzle-base';
import _ from 'lodash';

export enum Direction {
    NORTH = 'N',
    EAST = 'E',
    SOUTH = 'S',
    WEST = 'W'
}

export interface Guard {
    position: number[];
    direction: Direction;
    isAtEdge: boolean;
    uniqueVisitedPositions?: Set<string>;
    uniqueLoopObstaclePositions?: Set<string>;
}

export class Puzzle02 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '06';
        super(dayNumber, '02', dryRun);
    }

    public solve(): string {
        let map: string[][] = [];

        this.input.lines.forEach((line) => {
            map.push(line.split(''));
        });

        let guard: Guard = {
            position: [0, 0],
            direction: Direction.NORTH as Direction,
            isAtEdge: false,
            uniqueLoopObstaclePositions: new Set<string>()
        };

        _.range(map.length).forEach((row) => {
            _.range(map[row].length).forEach((col) => {
                if (map[row][col] === '^') {
                    guard.position = [row, col];
                }
            });
        });

        console.log(
            'Guard starting position:',
            guard.position.map((pos) => pos + 1)
        );

        while (!guard.isAtEdge) {
            this.determineDirection(guard, map);
            this.moveGuard(map, guard);

            this.determineLoopPosition(map, guard);
        }

        console.log('Solution:', guard.uniqueLoopObstaclePositions!.size);
        return guard.uniqueLoopObstaclePositions!.size.toString();
    }

    public determineDirection(guard: Guard, map: string[][]): void {
        let canMove = false;

        while (!canMove) {
            switch (guard.direction) {
                case Direction.NORTH:
                    if (map[guard.position[0] - 1][guard.position[1]] === '#') {
                        guard.direction = Direction.EAST;
                    } else canMove = true;
                    break;
                case Direction.EAST:
                    if (map[guard.position[0]][guard.position[1] + 1] === '#') {
                        guard.direction = Direction.SOUTH;
                    } else canMove = true;
                    break;
                case Direction.SOUTH:
                    if (map[guard.position[0] + 1][guard.position[1]] === '#') {
                        guard.direction = Direction.WEST;
                    } else canMove = true;
                    break;
                case Direction.WEST:
                    if (map[guard.position[0]][guard.position[1] - 1] === '#') {
                        guard.direction = Direction.NORTH;
                    } else canMove = true;
                    break;
                default:
                    break;
            }
        }
    }

    public moveGuard(map: string[][], guard: Guard): void {
        switch (guard.direction) {
            case Direction.NORTH:
                guard.position = [guard.position[0] - 1, guard.position[1]];
                guard.isAtEdge = guard.position[0] === 0;
                break;
            case Direction.EAST:
                guard.position = [guard.position[0], guard.position[1] + 1];
                guard.isAtEdge = guard.position[1] === map[0].length - 1;
                break;
            case Direction.SOUTH:
                guard.position = [guard.position[0] + 1, guard.position[1]];
                guard.isAtEdge = guard.position[0] === map.length - 1;
                break;
            case Direction.WEST:
                guard.position = [guard.position[0], guard.position[1] - 1];
                guard.isAtEdge = guard.position[1] === 0;
                break;
            default:
                break;
        }
    }

    public determineLoopPosition(map: string[][], guard: Guard): void {
        let ghostGuard: Guard = {
            position: guard.position,
            direction: guard.direction,
            isAtEdge: guard.isAtEdge,
            uniqueVisitedPositions: new Set<string>()
        };

        let obstructionPosition: number[] = [];

        switch (guard.direction) {
            case Direction.NORTH:
                obstructionPosition = [guard.position[0] - 1, guard.position[1]];
                break;
            case Direction.EAST:
                obstructionPosition = [guard.position[0], guard.position[1] + 1];
                break;
            case Direction.SOUTH:
                obstructionPosition = [guard.position[0] + 1, guard.position[1]];
                break;
            case Direction.WEST:
                obstructionPosition = [guard.position[0], guard.position[1] - 1];
                break;
            default:
                break;
        }

        // console.log(
        //     chalk.green(
        //         'Determining loop position for guard with current position and new obstruction position, with starting direction:',
        //         guard.position.map((pos) => pos + 1),
        //         obstructionPosition.map((pos) => pos + 1),
        //         guard.direction
        //     )
        // );

        let isFirstLoop = true;
        let isLoop = false;

        while (!ghostGuard.isAtEdge && !isLoop) {
            const tempMap = map.map((row) => row.slice()); // Deep clone the original map
            tempMap[obstructionPosition[0]][obstructionPosition[1]] = '#';

            // if (_.isEqual(ghostGuard.position, guard.position) && ghostGuard.direction !== guard.direction) {
            //     console.log(
            //         chalk.cyan(
            //             'Passing starting position in different direction:',
            //             ghostGuard.position.map((pos) => pos + 1)
            //         )
            //     );
            // }

            this.determineDirection(ghostGuard, tempMap);
            this.moveGuard(tempMap, ghostGuard);

            if (
                !isFirstLoop &&
                // _.isEqual(ghostGuard.position, guard.position) &&
                // ghostGuard.direction === guard.direction
                ghostGuard.uniqueVisitedPositions!.has(`${ghostGuard.position.join(',')}${ghostGuard.direction}`)
            ) {
                console.log(
                    chalk.red(
                        'Loop detected:',
                        ghostGuard.position.map((pos) => pos + 1),
                        `${ghostGuard.position.join(',')}${ghostGuard.direction}`
                    )
                );
                isLoop = true;
                guard.uniqueLoopObstaclePositions!.add(obstructionPosition.join(','));
                break;
            }

            isFirstLoop = false;

            ghostGuard.uniqueVisitedPositions!.add(`${ghostGuard.position.join(',')}${ghostGuard.direction}`);

            // if (ghostGuard.isAtEdge) {
            //     console.log(chalk.yellow('Ghost guard reached the edge.'));
            // }
        }
    }
}
