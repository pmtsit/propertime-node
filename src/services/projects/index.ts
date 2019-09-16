import {AxiosInstance} from 'axios';
import {IProject} from '../../models/project';
import BaseService from '../base';

export interface ICreateProjectParams {
    name: string;
    client_id: string;
    external_id?: string;
}

export interface IPatchProjectParams {
    name?: string;
    external_id?: string;
}

export default class ProjectsService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/projects');
    }

    public async list(offset?: number, limit?: number): Promise<IProject[]> {
        return await super._list<IProject>(offset, limit);
    }

    public async get(id: string): Promise<IProject | null> {
        return await super._get<IProject>(id);
    }

    public async create(params: ICreateProjectParams): Promise<IProject | null> {
        return await super._create<IProject>(params);
    }

    public async patch(id: string, params: IPatchProjectParams): Promise<IProject | null> {
        return await super._patch<IProject>(id, params);
    }
}
