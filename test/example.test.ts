import { Puzzle01 } from '../src/day-00/puzzle-01';
import { Puzzle02 } from '../src/day-00/puzzle-02';

describe('Puzzles', () => {
    test('Solve puzzle 1 should return solution', () => {
        const solution = new Puzzle01().solve();
        expect(solution).toBe('inputsample01line01inputsample01line02');
    });

    test('Solve puzzle 2 should return solution', () => {
        const solution = new Puzzle02().solve();
        expect(solution).toBe('inputsample02line01inputsample02line02');
    });
});
