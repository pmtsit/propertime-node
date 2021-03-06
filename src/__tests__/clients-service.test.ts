import ProperTimeClient from '../index';
import { Client } from '../models/client';

let originalNumberOfClients = 0;
let clients: Client[] = [];
let createdClient: Client | null = null;

let properTimeClient: ProperTimeClient;

describe('Clients Service Tests', () => {
  beforeAll(() => {
    properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
  });

  test('Get clients', async () => {
    clients = await properTimeClient.clients.list();
    originalNumberOfClients = clients.length;
  }, 10000);

  test('Create client', async () => {
    createdClient = await properTimeClient.clients.create({
      externalId: 'client1externalid',
      name: 'client1',
    });

    expect(createdClient).toHaveProperty('name', 'client1');
    expect(createdClient).toHaveProperty('externalId', 'client1externalid');
  }, 10000);

  test('Patch client', async () => {
    if (!createdClient) {
      throw new Error('cannot run test - createdClient is null');
    } else {
      createdClient = await properTimeClient.clients.patch(createdClient.id, {
        externalId: 'client1externalid_patched',
      });

      expect(createdClient).toHaveProperty('name', 'client1');
      expect(createdClient).toHaveProperty('externalId', 'client1externalid_patched');
    }
  }, 10000);

  test('Get client again', async () => {
    if (!createdClient) {
      throw new Error('cannot run test - createdClient is null');
    } else {
      const client = await properTimeClient.clients.get(createdClient.id);

      expect(client).toBeDefined();
      expect(client).toHaveProperty('externalId', 'client1externalid_patched');
    }
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
});
