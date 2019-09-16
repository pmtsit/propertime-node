import {AxiosInstance} from 'axios';
import {ITask} from '../../models/task';
import BaseService from '../base';

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

    public async create(name: string, projectId: string, isAbsence: boolean, externalId?: string): Promise<ITask | null> {
        return await super._create<ITask>({
            external_id: externalId,
            is_absence: isAbsence,
            name,
            project_id: projectId,
        })
    }
}
