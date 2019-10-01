import {IClient} from './client';
import {ITask} from './task';
import {User} from './user';

export interface IEntry {
  id: string;
  user?: User;
  task?: ITask;
  client?: IClient;
  is_deleted: boolean;
  start_time: Date;
  end_time?: Date;
  duration?: number;
  remarks?: string;
}
