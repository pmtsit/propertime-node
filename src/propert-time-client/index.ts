import axios, {AxiosInstance} from 'axios';
import { IClient } from '../models/client';

export default class ProperTimeClient {
  private readonly axios?: AxiosInstance;
  private readonly username: string;
  private readonly apiKey: string;


  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;

    this.axios = axios.create({
      baseURL: 'https://test-api.propertime.io/v1',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 1000,
    });
  }

  public async getClients(): Promise<IClient[]> {
    if (!this.axios) {
      return [];
    }

    const clients = await this.axios.get('/clients').then((res) => res.data as IClient[]);

    console.log(`got ${clients.length} clients`);

    return clients;
  }
}

