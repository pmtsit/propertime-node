import { Expose, Type } from 'class-transformer';
import { ICreateUserParams } from '../interfaces/create-user-params.interface';

export class CreateUserParams implements ICreateUserParams {
  @Expose({ name: 'first_name' })
  public firstName: string;
  @Expose({ name: 'last_name' })
  public lastName: string;
  @Expose({ name: 'display_name' })
  public displayName?: string;
  public email?: string;
  @Expose({ name: 'external_id' })
  public externalId?: string;
  @Expose({ name: 'employee_number' })
  public employeeNumber?: string;
  @Expose({ name: 'id_number' })
  public idNumber?: string;
  @Expose({ name: 'rfid_card_number' })
  public rfidCardNumber?: string;
  @Expose({ name: 'job_title' })
  public jobTitle: string;
  @Expose({ name: 'time_approved_by' })
  public timeApprovedBy?: string;
  @Expose({ name: 'organizational_unit' })
  public organizationalUnit?: string;
  @Type(() => Date)
  @Expose({ name: 'date_of_birth' })
  public dateOfBirth?: Date;
  @Type(() => Date)
  @Expose({ name: 'hire_date' })
  public hireDate?: Date;
  @Type(() => Date)
  @Expose({ name: 'termination_date' })
  public terminationDate?: Date;

  constructor(createUserParams: ICreateUserParams) {
    Object.assign(this, createUserParams);
  }
}
