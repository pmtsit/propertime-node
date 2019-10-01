import {Expose} from 'class-transformer';
import {Client} from './client';

export class Project {
  public id: string;
  public name: string;
  @Expose({ name: "is_active" })
  public isActive: boolean;
  @Expose({ name: "external_id" })
  public externalId?: string;
  public client: Client;
}
