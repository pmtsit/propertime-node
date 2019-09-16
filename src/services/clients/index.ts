import {AxiosInstance} from 'axios';
import {IClient} from '../../models/client';
import BaseService from '../base';

export interface ICreateClientParams {
    name: string;
    external_id?: string;
}

export interface IPatchClientParams {
    name?: string;
    external_id?: string;
}

export default class ClientsService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/clients');
    }

    public async list(offset?: number, limit?: number): Promise<IClient[]> {
        return await super._list<IClient>(offset, limit);
    }

    public async get(id: string): Promise<IClient | null> {
        return await super._get<IClient>(id);
    }

    public async create(params: ICreateClientParams): Promise<IClient | null> {
        return await super._create<IClient>(params);
    }

    public async patch(id: string, params: IPatchClientParams): Promise<IClient | null> {
        return await super._patch<IClient>(id, params);
    }
}
