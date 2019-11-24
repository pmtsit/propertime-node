import { Expose } from 'class-transformer';
import { IGetUsersFilterOptions } from '../interfaces/get-users-filter-options.interface';

export class GetUsersFilterOptions implements IGetUsersFilterOptions {
  @Expose({ name: 'is_active' })
  public isActive?: boolean;

  @Expose({ name: 'termination_after' })
  public terminationAfter?: Date;

  constructor(getUsersFilterOptions: IGetUsersFilterOptions) {
    Object.assign(this, getUsersFilterOptions);
  }
}
