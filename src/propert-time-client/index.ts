import axios, { AxiosInstance } from 'axios';
import createDebug from 'debug';
import { IClient } from '../models/client';
import ClientsService from '../services/clients';

export default class ProperTimeClient {
  public readonly clients: ClientsService;

  private readonly debug = createDebug('propertime-client');
  private readonly axios?: AxiosInstance;
  private readonly username: string;

  private readonly apiKey: string;

  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;

    this.axios = axios.create({
      // baseURL: 'https://test-api.propertime.io/v1',
      baseURL: 'http://localhost:3000/v1',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 1000,
    });

    this.clients = new ClientsService(this.axios);
  }
  //
  // public async createClient(name: string, externalId?: string): Promise<IClient | null> {
  //   if (!this.axios) {
  //     return null;
  //   }
  //
  //   const res = await this.axios
  //       .post('/clients', {
  //         external_id: externalId,
  //         name,
  //       });
  //
  //   const client = res.data as IClient;
  //
  //   if (client) {
  //     this.debug(`created the client ${client.name} with id ${client.id}`);
  //   } else {
  //     this.debug('client not created');
  //   }
  //
  //
  //   return client;
  // }
}
