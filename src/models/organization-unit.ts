import {Expose} from 'class-transformer';

export class OrganizationUnit {
  public id: string;
  public name: string;
  @Expose({ name: "unit_number" })
  public unitNumber: string;
  @Expose({ name: "is_active" })
  public isActive: boolean;
}
