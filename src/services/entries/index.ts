import {AxiosInstance} from 'axios';
import {Entry} from '../../models/entry';
import BaseService from '../base';
import {classToPlain, Expose, plainToClass, Type} from 'class-transformer';

export interface ICreateEntryParams {
    userId: string;
    taskId: string;
    clientId?: string;
    startTime: Date;
    endTime?: Date;
    remarks?: string;
}

export class CreateEntryParams implements ICreateEntryParams{
    @Expose({ name: "user_id" })
    public userId: string;
    @Expose({ name: "task_id" })
    public taskId: string;
    @Expose({ name: "client_id" })
    public clientId?: string;
    @Type(() => Date)
    @Expose({ name: "start_time" })
    public startTime: Date;
    @Type(() => Date)
    @Expose({ name: "end_time" })
    public endTime?: Date;
    public remarks?: string;

    constructor(createEntryParams: ICreateEntryParams) {
        Object.assign(this, createEntryParams);
    }
}

export interface IPatchEntryParams {
    taskId?: string;
    clientId?: string;
    startTime?: Date;
    endTime?: Date;
    remarks?: string;
}

export class PatchEntryParams implements  IPatchEntryParams {
    @Expose({ name: "task_id" })
    public taskId?: string;
    @Expose({ name: "client_id" })
    public clientId?: string;
    @Type(() => Date)
    @Expose({ name: "start_time" })
    public startTime?: Date;
    @Type(() => Date)
    @Expose({ name: "end_time" })
    public endTime?: Date;
    public remarks?: string;

    constructor(patchEntryParams: IPatchEntryParams) {
        Object.assign(this, patchEntryParams);
    }
}

export default class EntriesService extends BaseService<Entry> {
    constructor(axios: AxiosInstance) {
        super(axios, '/entries');
    }

    public async list(offset?: number, limit?: number): Promise<Entry[]> {
        const result = await super._list(offset, limit);

        const entries = result ? plainToClass(Entry, result) : [];

        return entries;
    }

    public async get(id: string): Promise<Entry | null> {
        const result = await super._get(id);

        const entry = result ? plainToClass(Entry, result) : null;

        return entry;
    }

    public async create(params: ICreateEntryParams): Promise<Entry | null> {
        const result = await super._create(classToPlain(new CreateEntryParams(params)));

        const entry = result ? plainToClass(Entry, result) : null;

        return entry;
    }

    public async patch(id: string, params: IPatchEntryParams): Promise<Entry | null> {
        const result = await super._patch(id, classToPlain(new PatchEntryParams(params)));

        const entry = result ? plainToClass(Entry, result) : null;

        return entry;
    }
}
