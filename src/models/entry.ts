import { Expose, Type } from 'class-transformer';
import { Client } from './client';
import { Task } from './task';
import { User } from './user';

export class Entry {
  public id: string;
  public user?: User;
  public task?: Task;
  public client?: Client;
  @Expose({ name: 'is_deleted' })
  public isDeleted: boolean;
  @Type(() => Date)
  @Expose({ name: 'start_time' })
  public startTime: Date;
  @Type(() => Date)
  @Expose({ name: 'end_time' })
  public endTime?: Date;
  public duration?: number;
  public remarks?: string;
}
