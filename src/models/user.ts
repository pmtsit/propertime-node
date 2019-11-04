import {classToPlain, Expose, plainToClass, Type} from "class-transformer";
export class User {
  public id: string;
  @Expose({ name: "first_name" })
  public firstName: string;
  @Expose({ name: "last_name" })
  public lastName: string;
  @Expose({ name: "display_name" })
  public displayName: string;
  public email?: string;
  @Expose({ name: "external_id" })
  public externalId?: string;
  @Expose({ name: "employee_number" })
  public employeeNumber: string;
  @Expose({ name: "id_number" })
  public idNumber?: string;
  @Expose({ name: "rfid_card_number" })
  public rfidCardNumber?: string;
  @Expose({ name: "job_title" })
  public jobTitle: string;
  @Type(() => Date)
  @Expose({ name: "hire_date" })
  public hireDate?: Date;
  @Type(() => Date)
  @Expose({ name: "termination_date" })
  public terminationDate?: Date;
  @Type(() => Date)
  @Expose({ name: "date_of_birth" })
  public dateOfBirth?: Date;

}
