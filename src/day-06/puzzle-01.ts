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
    amountOfSteps: number;
    visitedPositions: number[][];
}

export class Puzzle01 extends PuzzleBase {
    constructor(dryRun: boolean = true) {
        // TODO: set variable for day after copying file
        const dayNumber = '06';
        super(dayNumber, '01', dryRun);
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
            amountOfSteps: 0,
            visitedPositions: []
        };

        _.range(map.length).forEach((row) => {
            _.range(map[row].length).forEach((col) => {
                if (map[row][col] === '^') {
                    guard.position = [row, col];
                    guard.visitedPositions.push(guard.position);
                }
            });
        });

        console.log(
            'Guard starting position:',
            guard.position.map((pos) => pos + 1)
        );

        while (!guard.isAtEdge) {
            guard = this.moveGuard(map, guard);
            console.log(
                'Guard moved to:',
                guard.position.map((pos) => pos + 1)
            );
        }

        console.log('Amount of steps:', guard.amountOfSteps);
        console.log('Filtering unique visited positions, current amount:', guard.visitedPositions.length);

        guard.visitedPositions = _.uniqWith(guard.visitedPositions, _.isEqual);

        console.log('Solution:', guard.visitedPositions.length);
        return guard.visitedPositions.length.toString();
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

    public moveGuard(map: string[][], guard: Guard): Guard {
        this.determineDirection(guard, map);

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

        guard.visitedPositions.push(guard.position);
        guard.amountOfSteps++;

        return guard;
    }
}
