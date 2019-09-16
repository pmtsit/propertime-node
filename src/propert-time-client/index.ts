import axios, { AxiosInstance } from 'axios';
import createDebug from 'debug';
import { IClient } from '../models/client';
import ClientsService from '../services/clients';
import ProjectsService from '../services/projects';
import TasksService from '../services/tasks';

export default class ProperTimeClient {
  public readonly clients: ClientsService;
  public readonly projects: ProjectsService;
  public readonly tasks: TasksService;

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
    this.projects = new ProjectsService(this.axios);
    this.tasks = new TasksService(this.axios);
  }

}
