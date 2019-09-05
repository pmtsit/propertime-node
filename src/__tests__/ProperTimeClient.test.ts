import ProperTimeClient from '../index';
test('ProperTimeClient', () => {
    expect(new ProperTimeClient('Carl', 'aaaa').getClients()).toBe('Hello Carl - your apiKey is aaaa');
});
