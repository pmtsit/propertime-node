import {IClient} from './client';
import {ITask} from './task';
import {IUser} from './user';

export interface IEntry {
  id: string;
  user?: IUser;
  task?: ITask;
  client?: IClient;
  is_deleted: boolean;
  start_time: Date;
  end_time?: Date;
  duration?: number;
  remarks?: string;
}
