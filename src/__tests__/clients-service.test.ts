import ProperTimeClient from '../index';
import {IClient} from '../models/client';

let originalNumberOfClients = 0;
let clients: IClient[] = [];
let createdClient: IClient | null = null;

const properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');

test('Get clients', async () => {

    clients = await properTimeClient.clients.list();
    originalNumberOfClients = clients.length;
}, 10000);

test('Create client', async () => {
    createdClient = await properTimeClient.clients.create('client1', 'client1externalid');

    expect(createdClient).toHaveProperty('name', 'client1');
    expect(createdClient).toHaveProperty('external_id', 'client1externalid');
}, 10000);

test('Get clients again', async () => {
    clients = await properTimeClient.clients.list();

    expect(clients).toHaveLength(originalNumberOfClients + 1);
}, 10000);

test('Delete client', async () => {
    if (!createdClient) {
        throw new Error('cannot run test - createdClient is null');
    } else {
        const deleteResult = await properTimeClient.clients.delete(createdClient.id);

        expect(deleteResult).toHaveProperty('id', createdClient.id);
        expect(deleteResult).toHaveProperty('result', true);
    }
}, 10000);

test('Get clients again', async () => {
    clients = await properTimeClient.clients.list();

    expect(clients).toHaveLength(originalNumberOfClients);
}, 10000);
