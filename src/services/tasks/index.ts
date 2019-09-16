import {AxiosInstance} from 'axios';
import {ITask} from '../../models/task';
import BaseService from '../base';

export interface ICreateTaskParams {
    name: string;
    project_id: string;
    external_id?: string;
    is_absence: boolean;
}

export interface IPatchTaskParams {
    name?: string;
    external_id?: string;
}

export default class TasksService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/tasks');
    }

    public async list(offset?: number, limit?: number): Promise<ITask[]> {
        return await super._list<ITask>(offset, limit);
    }

    public async get(id: string): Promise<ITask | null> {
        return await super._get<ITask>(id);
    }

    public async create(params: ICreateTaskParams): Promise<ITask | null> {
        return await super._create<ITask>(params);
    }

    public async patch(id: string, params: IPatchTaskParams): Promise<ITask | null> {
        return await super._patch<ITask>(id, params);
    }
}
