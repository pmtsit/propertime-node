import {IClient} from './client';

export interface IProject {
  id: string;
  name: string;
  is_active: boolean;
  external_id?: string;
  client: IClient;
}
