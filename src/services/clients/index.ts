import { AxiosInstance } from 'axios';
import { classToPlain, Expose, plainToClass } from 'class-transformer';
import { Client } from '../../models/client';
import BaseService from '../base';

export interface ICreateClientParams {
  name: string;
  externalId?: string;
}

export class CreateClientParams implements ICreateClientParams {
  public name: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;

  constructor(createClientParams: ICreateClientParams) {
    Object.assign(this, createClientParams);
  }
}

export interface IPatchClientParams {
  name?: string;
  externalId?: string;
}

export class PatchClientParams implements IPatchClientParams {
  public name?: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;

  constructor(patchClientParams: IPatchClientParams) {
    Object.assign(this, patchClientParams);
  }
}

export default class ClientsService extends BaseService<Client> {
  constructor(axios: AxiosInstance) {
    super(axios, '/clients');
  }

  public async list(offset?: number, limit?: number): Promise<Client[]> {
    const result = await super._list(offset, limit);

    const clients = result ? plainToClass(Client, result) : [];

    return clients;
  }

  public async get(id: string): Promise<Client | null> {
    const result = await super._get(id);

    const client = result ? plainToClass(Client, result) : null;

    return client;
  }

  public async create(params: ICreateClientParams): Promise<Client | null> {
    const result = await super._create(classToPlain(new CreateClientParams(params)));

    const client = result ? plainToClass(Client, result) : null;

    return client;
  }

  public async patch(id: string, params: IPatchClientParams): Promise<Client | null> {
    const result = await super._patch(id, classToPlain(new PatchClientParams(params)));

    const client = result ? plainToClass(Client, result) : null;

    return client;
  }
}
