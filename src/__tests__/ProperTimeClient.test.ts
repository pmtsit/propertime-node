import ProperTimeClient from '../index';
test('ProperTimeClient', async () => {
    const properTimeClient = new ProperTimeClient('uris', '4830750d-6baf-a73e-923d-b8050ba1d28d');
    const clients = await properTimeClient.getClients()

    expect(clients).toHaveLength(1);
});
