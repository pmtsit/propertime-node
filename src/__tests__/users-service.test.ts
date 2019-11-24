import ProperTimeClient from '../index';
import { User } from '../models/user';

import * as moment from 'moment-timezone';

moment.tz.setDefault('Universal');

let originalNumberOfUsers = 0;
let originalNumberOfActiveUsers = 0;
let originalNumberOfInactiveUsers = 0;
let users: User[] = [];
let activeUsers: User[] = [];
let inactiveUsers: User[] = [];
let terminatedUsers: User[] = [];
let createdUser: User | null = null;

let properTimeClient: ProperTimeClient;

describe('Users Service Tests', () => {
  beforeAll(() => {
    properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
  });

  test('Get users', async () => {
    users = await properTimeClient.users.list();
    originalNumberOfUsers = users.length;
  }, 10000);

  test('Get active users', async () => {
    activeUsers = await properTimeClient.users.list(0, 1000, { isActive: true });
    originalNumberOfActiveUsers = activeUsers.length;
  }, 10000);

  test('Get inactive users', async () => {
    inactiveUsers = await properTimeClient.users.list(undefined, 100, { isActive: false });
    originalNumberOfInactiveUsers = inactiveUsers.length;
  }, 10000);

  test('Create user', async () => {
    createdUser = await properTimeClient.users.create({
      dateOfBirth: moment.utc('1990-03-01').toDate(),
      displayName: 'user1',
      email: 'user1@propertime.io',
      // employeeNumber: '123456', // check not mandatory
      externalId: 'user1externalid',
      firstName: 'first1',
      hireDate: moment.utc('2010-04-22').toDate(),
      idNumber: '654635412',
      jobTitle: 'test user',
      lastName: 'last1',
      // organizational_unit: "",
      // rfid_card_number: "",
      terminationDate: moment.utc('2019-10-21').toDate(),
      // time_approved_by: "",
    });

    expect(createdUser).toHaveProperty('displayName', 'user1');
    expect(createdUser).toHaveProperty('externalId', 'user1externalid');

    // expect(createdUser).toHaveProperty('dateOfBirth', moment.utc('1990-03-01').toDate());
    expect(createdUser).toHaveProperty('hireDate', moment.utc('2010-04-22').toDate());
    expect(createdUser).toHaveProperty('terminationDate', moment.utc('2019-10-21').toDate());
  }, 10000);

  test('Patch user', async () => {
    if (!createdUser) {
      throw new Error('cannot run test - createdTask is null');
    } else {
      createdUser = await properTimeClient.users.patch(createdUser.id, {
        externalId: 'user1externalid_patched',
      });

      expect(createdUser).toHaveProperty('displayName', 'user1');
      expect(createdUser).toHaveProperty('externalId', 'user1externalid_patched');
    }
  }, 10000);

  test('Get user again', async () => {
    if (!createdUser) {
      throw new Error('cannot run test - createdUser is null');
    } else {
      const user = await properTimeClient.users.get(createdUser.id);

      expect(user).toBeDefined();
      expect(user).toHaveProperty('externalId', 'user1externalid_patched');
    }
  }, 10000);

  test('Get users with termination', async () => {
    terminatedUsers = await properTimeClient.users.list(undefined, 100, {
      terminationAfter: moment('1990-01-01').toDate(),
    });

    expect(terminatedUsers ? terminatedUsers.length : 0).toBeGreaterThan(0);
  }, 10000);

  test('Delete user', async () => {
    if (!createdUser) {
      throw new Error('cannot run test - createdUser is null');
    } else {
      const deleteResult = await properTimeClient.users.delete(createdUser.id);

      expect(deleteResult).toHaveProperty('id', createdUser.id);
      expect(deleteResult).toHaveProperty('result', true);
    }
  }, 10000);
});
