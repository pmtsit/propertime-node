import ProperTimeClient from '../index';
import {User} from '../models/user';

import * as moment from 'moment-timezone';
moment.tz.setDefault("Universal");

let originalNumberOfUsers = 0;
let users: User[] = [];
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

    test('Create user', async () => {
        createdUser = await properTimeClient.users.create({
            dateOfBirth: moment("1990-03-01").toDate(),
            displayName: 'user1',
            email: 'user1@propertime.io',
            employeeNumber: '123456',
            externalId: 'user1externalid',
            firstName: 'first1',
            hireDate: moment("2010-04-22").toDate(),
            idNumber: '654635412',
            jobTitle: 'test user',
            lastName: 'last1',
            // organizational_unit: "",
            // rfid_card_number: "",
            terminationDate: moment("2019-10-21").toDate(),
            // time_approved_by: "",
        });

        expect(createdUser).toHaveProperty('displayName', 'user1');
        expect(createdUser).toHaveProperty('externalId', 'user1externalid');

        expect(createdUser).toHaveProperty('dateOfBirth', moment("1990-03-01").toDate());
        expect(createdUser).toHaveProperty('hireDate', moment("2010-04-22").toDate());
        expect(createdUser).toHaveProperty('terminationDate', moment("2019-10-21").toDate());
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
