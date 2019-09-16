import ProperTimeClient from '../index';
import {IEntry} from '../models/entry';
import {ITask} from '../models/task';
import {IUser} from '../models/user';

const entries: IEntry[] = [];
let selectedTask: ITask | null = null;
let selectedUser: IUser | null = null;
let createdEntry: IEntry | null = null;

let properTimeClient: ProperTimeClient;

describe('Entries Service Tests', () => {

    beforeAll(() => {
        properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
    });

    test('Get some entries', async () => {

        const limit = 5;
        const maxPages = 5;
        let pages = 0;
        let offset = 0;
        let shouldContinue = true;
        let total = 0;

        while (shouldContinue) {
            const page = await properTimeClient.entries.list(offset, limit);

            pages++;

            offset += page.length;
            total += page.length;

            entries.push(...page);

            shouldContinue = (page.length === limit && pages < maxPages);
        }

        expect(entries.length).toEqual(total);

    }, 10000);

    test('Select user', async () => {
        const firstUser = (await properTimeClient.users.list(undefined, 1));

        selectedUser = firstUser.length === 1 ? firstUser[0] : null;

        expect(selectedUser).toBeDefined();
    }, 10000);

    test('Select task', async () => {
        const firstTask = (await properTimeClient.tasks.list(undefined, 1));

        selectedTask = firstTask.length === 1 ? firstTask[0] : null;

        expect(selectedTask).toBeDefined();
    }, 10000);

    test('Create entry', async () => {
        if (!selectedUser) {
            throw new Error('cannot run test - selectedUser is null');
        } else if (!selectedTask) {
            throw new Error('cannot run test - selectedTask is null');
        } else {
            createdEntry = await properTimeClient.entries.create({
                // client_id: "",
                end_time: new Date(2019,9,1, 11),
                remarks: 'test entry',
                start_time: new Date(2019,9,1, 10),
                task_id: selectedTask.id,
                user_id: selectedUser.id,
            });

            expect(createdEntry).toHaveProperty('duration', 60);
            expect(createdEntry).toHaveProperty('task.id', selectedTask.id);
            expect(createdEntry).toHaveProperty('user.id', selectedUser.id);
        }
    }, 10000);

    test('Patch entry', async () => {
        if (!createdEntry) {
            throw new Error('cannot run test - createdEntry is null');
        } else if (!selectedTask) {
            throw new Error('cannot run test - selectedTask is null');
        } else {
            createdEntry = await properTimeClient.entries.patch(createdEntry.id, {
                remarks: 'entry_patched',
            });

            expect(createdEntry).toHaveProperty('task.id', selectedTask.id);
            expect(createdEntry).toHaveProperty('remarks', 'entry_patched');
        }
    }, 10000);

    test('Get entry again', async () => {
        if (!createdEntry) {
            throw new Error('cannot run test - createdEntry is null');
        } else if (!selectedUser) {
            throw new Error('cannot run test - selectedUser is null');
        } else if (!selectedTask) {
            throw new Error('cannot run test - selectedTask is null');
        } else {
            const entry = await properTimeClient.entries.get(createdEntry.id);

            expect(entry).toBeDefined();
            expect(entry).toHaveProperty('duration', 60);
            expect(entry).toHaveProperty('task.id', selectedTask.id);
            expect(entry).toHaveProperty('user.id', selectedUser.id);
        }
    }, 10000);

    test('Delete entry', async () => {
        if (!createdEntry) {
            throw new Error('cannot run test - createdEntry is null');
        } else {
            const deleteResult = await properTimeClient.entries.delete(createdEntry.id);

            expect(deleteResult).toHaveProperty('id', createdEntry.id);
            expect(deleteResult).toHaveProperty('result', true);
        }
    }, 10000);

});
