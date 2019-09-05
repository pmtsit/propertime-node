import { IClient } from '../models/client';

export class ProperTimeClient {
  private readonly username: string;
  private readonly apiKey: string;

  constructor(username: string, apiKey: string) {
    this.username = username;
    this.apiKey = apiKey;
  }

  public getClients(): string {
    return `Hello ${this.username} - your apiKey is ${this.apiKey}`;
  }
}
