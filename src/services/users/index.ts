import { AxiosInstance } from 'axios';
import { classToPlain, plainToClass } from 'class-transformer';
import { User } from '../../models/user';
import BaseService from '../base';
import { ICreateUserParams } from './interfaces/create-user-params.interface';
import { IGetUsersFilterOptions } from './interfaces/get-users-filter-options.interface';
import { IPatchUserParams } from './interfaces/patch-user-params.interface';
import { CreateUserParams } from './models/create-user.params';
import { GetUsersFilterOptions } from './models/get-users-filter.options';
import { PatchUserParams } from './models/patch-user.params';

export default class UsersService extends BaseService<User> {
  constructor(axios: AxiosInstance) {
    super(axios, '/users');
  }

  public async list(offset?: number, limit?: number, filterOptions?: IGetUsersFilterOptions): Promise<User[]> {
    const result = await super._list(
      offset,
      limit,
      filterOptions !== undefined ? classToPlain(new GetUsersFilterOptions(filterOptions)) : undefined,
    );

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
