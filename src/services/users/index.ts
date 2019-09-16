import {AxiosInstance} from 'axios';
import {IUser} from '../../models/user';
import BaseService from '../base';

export interface ICreateUserParams {
    first_name: string;
    last_name: string;
    display_name?: string;
    email?: string;
    external_id?: string;
    employee_number: string;
    id_number?: string;
    rfid_card_number?: string;
    job_title: string;
    time_approved_by?: string;
    organizational_unit?: string;
    date_of_birth?: Date;
    hire_date?: Date;
    termination_date?: Date;
};

export default class UsersService extends BaseService {

    constructor(axios: AxiosInstance) {
        super(axios, '/users');
    }

    public async list(offset?: number, limit?: number): Promise<IUser[]> {
        return await super._list<IUser>(offset, limit);
    }

    public async get(id: string): Promise<IUser | null> {
        return await super._get<IUser>(id);
    }

    public async create(params: ICreateUserParams): Promise<IUser | null> {
        return await super._create<IUser>(params);
    }
}
