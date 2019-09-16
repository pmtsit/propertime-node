import ProperTimeClient from '../index';
import {IProject} from '../models/project';
import {ITask} from '../models/task';

let originalNumberOfTasks = 0;
let tasks: ITask[] = [];
let selectedProject: IProject | null = null;
let createdTask: ITask | null = null;

let properTimeClient: ProperTimeClient;

describe('Tasks Service Tests', () => {
    beforeAll(() => {
        properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
    });

    test('Get tasks', async () => {

        tasks = await properTimeClient.tasks.list();
        originalNumberOfTasks = tasks.length;
    }, 10000);

    test('Select project', async () => {
        const firstProject = (await properTimeClient.projects.list(undefined, 1));

        selectedProject = firstProject.length === 1 ? firstProject[0] : null;

        expect(selectedProject).toBeDefined();
    }, 10000);

    test('Create task', async () => {
        if (!selectedProject) {
            throw new Error('cannot run test - selectedProject is null');
        } else {
            createdTask = await properTimeClient.tasks.create({
                external_id: 'task1externalid',
                is_absence: true,
                name: 'task1',
                project_id: selectedProject.id
            });

            expect(createdTask).toHaveProperty('name', 'task1');
            expect(createdTask).toHaveProperty('project.id', selectedProject.id);
            expect(createdTask).toHaveProperty('is_absence', true);
            expect(createdTask).toHaveProperty('external_id', 'task1externalid');
        }
    }, 10000);

    test('Get task again', async () => {
        if (!createdTask) {
            throw new Error('cannot run test - createdTask is null');
        } else {
            const task = await properTimeClient.tasks.get(createdTask.id);

            expect(task).toBeDefined();
            expect(task).toHaveProperty('external_id', 'task1externalid');
        }
    }, 10000);

    test('Delete task', async () => {
        if (!createdTask) {
            throw new Error('cannot run test - createdTask is null');
        } else {
            const deleteResult = await properTimeClient.tasks.delete(createdTask.id);

            expect(deleteResult).toHaveProperty('id', createdTask.id);
            expect(deleteResult).toHaveProperty('result', true);
        }
    }, 10000);
});
