import { Example } from '../src/example';

describe('Example', () => {
    test('Example.sayHello should return "Hello, world!"', () => {
        expect(Example.sayHello()).toBe('Hello, world!');
    });
});
