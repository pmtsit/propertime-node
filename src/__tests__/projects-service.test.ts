import ProperTimeClient from '../index';
import {Client} from '../models/client';
import {Project} from '../models/project';

let originalNumberOfProjects = 0;
let projects: Project[] = [];
let selectedClient: Client | null = null;
let createdProject: Project | null = null;

let properTimeClient: ProperTimeClient;

describe('Projects Service Tests', () => {

    beforeAll(() => {
        properTimeClient = new ProperTimeClient('uris', 'b5391036-30cd-0b2b-4d44-1b87bd03f9f3');
    });

    test('Get projects', async () => {

        projects = await properTimeClient.projects.list();
        originalNumberOfProjects = projects.length;
    }, 10000);

    test('Select client', async () => {
        const firstClient = (await properTimeClient.clients.list(undefined, 1));

        selectedClient = firstClient.length === 1 ? firstClient[0] : null;

        expect(selectedClient).toBeDefined();
    }, 10000);

    test('Create project', async () => {
        if (!selectedClient) {
            throw new Error('cannot run test - selectedClient is null');
        } else {
            createdProject = await properTimeClient.projects.create({
                clientId: selectedClient.id,
                externalId: 'project1externalid',
                name: 'project1'
            });

            expect(createdProject).toHaveProperty('name', 'project1');
            expect(createdProject).toHaveProperty('client.id', selectedClient.id);
            expect(createdProject).toHaveProperty('externalId', 'project1externalid');
        }
    }, 10000);

    test('Patch project', async () => {
        if (!createdProject) {
            throw new Error('cannot run test - createdProject is null');
        } else {
            createdProject = await properTimeClient.projects.patch(createdProject.id, {
                externalId: 'project1externalid_patched'
            });

            expect(createdProject).toHaveProperty('name', 'project1');
            expect(createdProject).toHaveProperty('externalId', 'project1externalid_patched');
        }
    }, 10000);

    test('Get project again', async () => {
        if (!createdProject) {
            throw new Error('cannot run test - createdProject is null');
        } else {
            const project = await properTimeClient.projects.get(createdProject.id);

            expect(project).toBeDefined();
            expect(project).toHaveProperty('externalId', 'project1externalid_patched');
        }
    }, 10000);

    test('Delete project', async () => {
        if (!createdProject) {
            throw new Error('cannot run test - createdProject is null');
        } else {
            const deleteResult = await properTimeClient.projects.delete(createdProject.id);

            expect(deleteResult).toHaveProperty('id', createdProject.id);
            expect(deleteResult).toHaveProperty('result', true);
        }
    }, 10000);

});
