import ProperTimeClient from '../index';

let properTimeClient: ProperTimeClient;

describe('Generic Tests', () => {
    beforeAll(() => {
        properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
    });

    test('client initialized', () => {
        expect(properTimeClient).toBeDefined();
    }, 10000);
});
