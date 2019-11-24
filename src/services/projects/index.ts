import { AxiosInstance } from 'axios';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Project } from '../../models/project';
import BaseService from '../base';

export interface ICreateProjectParams {
  name: string;
  clientId: string;
  externalId?: string;
}

export class CreateProjectParams implements ICreateProjectParams {
  public name: string;
  @Expose({ name: 'client_id' })
  public clientId: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;

  constructor(createProjectParams: ICreateProjectParams) {
    Object.assign(this, createProjectParams);
  }
}

export interface IPatchProjectParams {
  name?: string;
  externalId?: string;
}

export class PatchProjectParams implements IPatchProjectParams {
  public name?: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;

  constructor(patchProjectParams: IPatchProjectParams) {
    Object.assign(this, patchProjectParams);
  }
}

export default class ProjectsService extends BaseService<Project> {
  constructor(axios: AxiosInstance) {
    super(axios, '/projects');
  }

  public async list(offset?: number, limit?: number): Promise<Project[]> {
    const result = await super._list(offset, limit);

    const projects = result ? plainToClass(Project, result) : [];

    return projects;
  }

  public async get(id: string): Promise<Project | null> {
    const result = await super._get(id);

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }

  public async create(params: ICreateProjectParams): Promise<Project | null> {
    const result = await super._create(classToPlain(new CreateProjectParams(params)));

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }

  public async patch(id: string, params: IPatchProjectParams): Promise<Project | null> {
    const result = await super._patch(id, classToPlain(new PatchProjectParams(params)));

    const project = result ? plainToClass(Project, result) : null;

    return project;
  }
}
