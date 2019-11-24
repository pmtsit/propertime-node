export interface ICreateUserParams {
  firstName: string;
  lastName: string;
  displayName?: string;
  email?: string;
  externalId?: string;
  employeeNumber?: string;
  idNumber?: string;
  rfidCardNumber?: string;
  jobTitle: string;
  timeApprovedBy?: string;
  organizationalUnit?: string;
  dateOfBirth?: Date;
  hireDate?: Date;
  terminationDate?: Date;
}
