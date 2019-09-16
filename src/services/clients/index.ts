import {AxiosInstance} from 'axios';
import {IClient} from '../../models/client';
import BaseService from '../base';

export default class ClientsService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/clients');
    }

    public async list(offset?: number, limit?: number): Promise<IClient[]> {
        return await super._list<IClient>(offset, limit);
    }

    public async create(name: string, externalId?: string): Promise<IClient | null> {
        return await super._create<IClient>({
            external_id: externalId,
            name,
        })
    }
}
