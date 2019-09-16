import {AxiosInstance} from 'axios';
import {IEntry} from '../../models/entry';
import BaseService from '../base';

export interface ICreateEntryParams {
    user_id: string;
    task_id: string;
    client_id?: string;
    start_time: Date;
    end_time?: Date;
    remarks?: string;
}

export interface IPatchEntryParams {
    task_id: string;
    client_id?: string;
    start_time: Date;
    end_time?: Date;
    remarks?: string;
}

export default class EntriesService extends BaseService {
    constructor(axios: AxiosInstance) {
        super(axios, '/entries');
    }

    public async list(offset?: number, limit?: number): Promise<IEntry[]> {
        return await super._list<IEntry>(offset, limit);
    }

    public async get(id: string): Promise<IEntry | null> {
        return await super._get<IEntry>(id);
    }

    public async create(params: ICreateEntryParams): Promise<IEntry | null> {
        return await super._create<IEntry>(params);
    }

    public async patch(id: string, params: IPatchEntryParams): Promise<IEntry | null> {
        return await super._patch<IEntry>(id, params);
    }
}
