import {AxiosInstance} from 'axios';
import {IProject} from '../../models/project';
import BaseService from '../base';

export default class ProjectsService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/projects');
    }

    public async list(offset?: number, limit?: number): Promise<IProject[]> {
        return await super._list<IProject>(offset, limit);
    }

    public async create(name: string, clientId: string, externalId?: string): Promise<IProject | null> {
        return await super._create<IProject>({
            client_id: clientId,
            external_id: externalId,
            name,
        })
    }
}
