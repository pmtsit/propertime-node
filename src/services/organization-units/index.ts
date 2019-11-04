import {AxiosInstance} from 'axios';
import {OrganizationUnit} from '../../models/organization-unit';
import BaseService from '../base';
import {classToPlain, Expose, plainToClass} from 'class-transformer';

export interface ICreateOrganizationUnitParams {
    name: string;
    unitNumber: string;
}

export class CreateOrganizationUnitParams implements ICreateOrganizationUnitParams {
    public name: string;
    @Expose({ name: "unit_number" })
    public unitNumber: string;

    constructor(createOrganizationUnitParams: ICreateOrganizationUnitParams) {
        Object.assign(this, createOrganizationUnitParams);
    }
}

export interface IPatchOrganizationUnitParams {
    name?: string;
    unitNumber?: string;
    isActive?: boolean;
}

export class PatchOrganizationUnitParams implements IPatchOrganizationUnitParams {
    public name?: string;
    @Expose({ name: "unit_number" })
    public unitNumber?: string;
    @Expose({ name: "is_active" })
    public isActive?: boolean;

    constructor(patchOrganizationUnitParams: IPatchOrganizationUnitParams) {
        Object.assign(this, patchOrganizationUnitParams);
    }
}

export default class OrganizationUnitsService extends BaseService<OrganizationUnit> {
    constructor(axios: AxiosInstance) {
        super(axios, '/organization-units');
    }

    public async list(offset?: number, limit?: number): Promise<OrganizationUnit[]> {
        const result = await super._list(offset, limit);

        const organizationUnits = result ? plainToClass(OrganizationUnit, result) : [];

        return organizationUnits;
    }

    public async get(id: string): Promise<OrganizationUnit | null> {
        const result = await super._get(id);

        const organizationUnit = result ? plainToClass(OrganizationUnit, result) : null;

        return organizationUnit;
    }

    public async create(params: ICreateOrganizationUnitParams): Promise<OrganizationUnit | null> {
        const result = await super._create(classToPlain(new CreateOrganizationUnitParams(params)));

        const organizationUnit = result ? plainToClass(OrganizationUnit, result) : null;

        return organizationUnit;
    }

    public async patch(id: string, params: IPatchOrganizationUnitParams): Promise<OrganizationUnit | null> {
        const result = await super._patch(id, classToPlain(new PatchOrganizationUnitParams(params)));

        const organizationUnit = result ? plainToClass(OrganizationUnit, result) : null;

        return organizationUnit;
    }
}
