import { AxiosInstance } from 'axios';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Task } from '../../models/task';
import BaseService from '../base';

export interface ICreateTaskParams {
  name: string;
  projectId: string;
  externalId?: string;
  isAbsence: boolean;
}

export class CreateTaskParams implements ICreateTaskParams {
  public name: string;
  @Expose({ name: 'project_id' })
  public projectId: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;
  @Expose({ name: 'is_absence' })
  public isAbsence: boolean;

  constructor(createTaskParams: ICreateTaskParams) {
    Object.assign(this, createTaskParams);
  }
}

export interface IPatchTaskParams {
  name?: string;
  externalId?: string;
  isAbsence?: boolean;
}

export class PatchTaskParams implements IPatchTaskParams {
  public name?: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;
  @Expose({ name: 'is_absence' })
  public isAbsence: boolean;

  constructor(patchTaskParams: IPatchTaskParams) {
    Object.assign(this, patchTaskParams);
  }
}

export default class TasksService extends BaseService<Task> {
  constructor(axios: AxiosInstance) {
    super(axios, '/tasks');
  }

  public async list(offset?: number, limit?: number): Promise<Task[]> {
    const result = await super._list(offset, limit);

    const tasks = result ? plainToClass(Task, result) : [];

    return tasks;
  }

  public async get(id: string): Promise<Task | null> {
    const result = await super._get(id);

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }

  public async create(params: ICreateTaskParams): Promise<Task | null> {
    const result = await super._create(classToPlain(new CreateTaskParams(params)));

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }

  public async patch(id: string, params: IPatchTaskParams): Promise<Task | null> {
    const result = await super._patch(id, classToPlain(new PatchTaskParams(params)));

    const task = result ? plainToClass(Task, result) : null;

    return task;
  }
}
