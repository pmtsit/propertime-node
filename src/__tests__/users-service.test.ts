import ProperTimeClient from '../index';
import {IClient} from '../models/client';
import {IUser} from '../models/user';

let originalNumberOfUsers = 0;
let users: IUser[] = [];
let createdUser: IUser | null = null;

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
            date_of_birth: new Date(1990, 2, 1),
            display_name: 'user1',
            email: 'user1@propertime.io',
            employee_number: '123456',
            external_id: 'user1externalid',
            first_name: 'first1',
            hire_date: new Date(2018, 3, 22),
            id_number: '654635412',
            job_title: 'test user',
            last_name: 'last1',
            // organizational_unit: "",
            // rfid_card_number: "",
            // termination_date: undefined,
            // time_approved_by: "",
        });

        expect(createdUser).toHaveProperty('display_name', 'user1');
        expect(createdUser).toHaveProperty('external_id', 'user1externalid');
    }, 10000);

    test('Patch user', async () => {
        if (!createdUser) {
            throw new Error('cannot run test - createdTask is null');
        } else {
            createdUser = await properTimeClient.users.patch(createdUser.id, {
                external_id: 'user1externalid_patched',
            });

            expect(createdUser).toHaveProperty('display_name', 'user1');
            expect(createdUser).toHaveProperty('external_id', 'user1externalid_patched');
        }
    }, 10000);

    test('Get user again', async () => {
        if (!createdUser) {
            throw new Error('cannot run test - createdUser is null');
        } else {
            const user = await properTimeClient.users.get(createdUser.id);

            expect(user).toBeDefined();
            expect(user).toHaveProperty('external_id', 'user1externalid_patched');
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
