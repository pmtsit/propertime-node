import ProperTimeClient from '../index';

const properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');

describe('Clients Service Tests', () => {
    test('client initialized', () => {
        expect(properTimeClient).toBeDefined();
    });
});
