import axios, { AxiosInstance } from 'axios';
import createDebug from 'debug';
import ClientsService from '../services/clients';
import ProjectsService from '../services/projects';
import TasksService from '../services/tasks';
import UsersService from '../services/users';
import EntriesService from '../services/entries';

export default class ProperTimeClient {
  public readonly clients: ClientsService;
  public readonly entries: EntriesService;
  public readonly projects: ProjectsService;
  public readonly tasks: TasksService;
  public readonly users: UsersService;

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
      timeout: 10000,
    });

    this.clients = new ClientsService(this.axios);
    this.projects = new ProjectsService(this.axios);
    this.tasks = new TasksService(this.axios);
    this.users = new UsersService(this.axios);
    this.entries = new EntriesService(this.axios);
  }

}
