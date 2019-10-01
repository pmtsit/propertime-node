import {AxiosInstance} from 'axios';
import {classToPlain, Expose, plainToClass, serialize, Type} from 'class-transformer';
import * as moment from 'moment-timezone';
import {User} from '../../models/user';
import BaseService from '../base';

export interface ICreateUserParams {
    firstName: string;
    lastName: string;
    displayName?: string;
    email?: string;
    externalId?: string;
    employeeNumber: string;
    idNumber?: string;
    rfidCardNumber?: string;
    jobTitle: string;
    timeApprovedBy?: string;
    organizationalUnit?: string;
    dateOfBirth?: Date;
    hireDate?: Date;
    terminationDate?: Date;
}

export class CreateUserParams implements ICreateUserParams{
    @Expose({ name: "first_name" })
    public firstName: string;
    @Expose({ name: "last_name" })
    public lastName: string;
    @Expose({ name: "display_name" })
    public displayName?: string;
    public email?: string;
    @Expose({ name: "external_id" })
    public externalId?: string;
    @Expose({ name: "employee_number" })
    public employeeNumber: string;
    @Expose({ name: "id_number" })
    public idNumber?: string;
    @Expose({ name: "rfid_card_number" })
    public rfidCardNumber?: string;
    @Expose({ name: "job_title" })
    public jobTitle: string;
    @Expose({ name: "time_approved_by" })
    public timeApprovedBy?: string;
    @Expose({ name: "organizational_unit" })
    public organizationalUnit?: string;
    @Type(() => Date)
    @Expose({ name: "date_of_birth" })
    public dateOfBirth?: Date;
    @Type(() => Date)
    @Expose({ name: "hire_date" })
    public hireDate?: Date;
    @Type(() => Date)
    @Expose({ name: "termination_date" })
    public terminationDate?: Date;

    constructor(createUserParams: ICreateUserParams) {
        Object.assign(this, createUserParams);
    }
}

export interface IPatchUserParams {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email?: string;
    externalId?: string;
    employeeNumber?: string;
    idNumber?: string;
    rfidCardNumber?: string;
    jobTitle?: string;
    timeApprovedBy?: string;
    organizationalUnit?: string;
    dateOfBirth?: Date;
    hireDate?: Date;
    terminationDate?: Date;
}

export class PatchUserParams implements IPatchUserParams {
    @Expose({ name: "first_name" })
    public firstName?: string;
    @Expose({ name: "last_name" })
    public lastName?: string;
    @Expose({ name: "display_name" })
    public displayName?: string;
    public email?: string;
    @Expose({ name: "external_id" })
    public externalId?: string;
    @Expose({ name: "employee_number" })
    public employeeNumber?: string;
    @Expose({ name: "id_number" })
    public idNumber?: string;
    @Expose({ name: "rfid_card_number" })
    public rfidCardNumber?: string;
    @Expose({ name: "job_title" })
    public jobTitle?: string;
    @Expose({ name: "time_approved_by" })
    public timeApprovedBy?: string;
    @Expose({ name: "organizational_unit" })
    public organizationalUnit?: string;
    @Type(() => Date)
    @Expose({ name: "date_of_birth" })
    public dateOfBirth?: Date;
    @Type(() => Date)
    @Expose({ name: "hire_date" })
    public hireDate?: Date;
    @Type(() => Date)
    @Expose({ name: "termination_date" })
    public terminationDate?: Date;

    constructor(patchUserParams: IPatchUserParams) {
        Object.assign(this, patchUserParams);
    }
}

export default class UsersService extends BaseService<User> {

    constructor(axios: AxiosInstance) {
        super(axios, '/users');
    }

    public async list(offset?: number, limit?: number): Promise<User[]> {
        const result = await super._list(offset, limit);

        const users = result ? plainToClass(User, result) : [];

        return users;
    }

    public async get(id: string): Promise<User | null> {
        const result = await super._get(id);

        const user = result ? plainToClass(User, result) : null;

        return user;
    }

    public async create(createUserParams: ICreateUserParams): Promise<User | null> {
        const result = await super._create(classToPlain(new CreateUserParams(createUserParams)));

        const user = result ? plainToClass(User, result) : null;

        return user;
    }

    public async patch(id: string, params: IPatchUserParams): Promise<User | null> {
        const result = await super._patch(id, classToPlain(new PatchUserParams(params)));

        const user = result ? plainToClass(User, result) : null;

        return user;
    }
}
