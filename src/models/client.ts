import { Expose } from 'class-transformer';

export class Client {
  public id: string;
  public name: string;
  @Expose({ name: 'is_active' })
  public isActive: boolean;
  @Expose({ name: 'external_id' })
  public externalId?: string;
}
