import { Expose } from 'class-transformer';
import { Project } from './project';

export class Task {
  public id: string;
  public name: string;
  @Expose({ name: 'is_absence' })
  public isAbsence: boolean;
  @Expose({ name: 'external_id' })
  public externalId?: string;
  public project: Project;
}
