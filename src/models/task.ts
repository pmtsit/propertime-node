import {IProject} from './project';

export interface ITask {
  id: string;
  name: string;
  is_absence: boolean;
  external_id?: string;
  project: IProject;
}
